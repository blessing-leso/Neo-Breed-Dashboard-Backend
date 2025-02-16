import jwt from "jsonwebtoken";
import { Employee } from "../models/Employees.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import AppError from "../utils/AppError.js";
import sendEmail from "../utils/email.js";
import { CatchAsync } from "../utils/CatchAsync.js";
import crypto from "crypto";

export const login = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const user = await Employee.findOne({ email: Email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(Password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH, {
      expiresIn: "7d",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 15 * 60 * 1000, //15 minutes
      sameSite: "Strict",
    });

    const authorizationHeader = `Bearer ${refreshToken}`;
    res.setHeader("Authorization", authorizationHeader);
    res
      .status(200)
      .json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (token) {
    try {
      const userToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = userToken;
      return next();
    } catch (error) {
      res.clearCookie("accessToken");

      const authHeader = req.headers["authorization"];
      const refreshToken = authHeader && authHeader.split(" ")[1];

      if (refreshToken) {
        try {
          const userRefreshToken = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH
          );
          const newAccessToken = jwt.sign(
            { id: userRefreshToken.id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
          );

          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 15 * 60 * 1000,
            sameSite: "Strict",
          });

          req.user = userRefreshToken;
          next();
        } catch (refreshtoken) {
          return res
            .status(403)
            .json({ message: "Invalid refresh token" })
            .clearCookie("accessToken");
        }
      } else {
        return res.status(401).json({ message: "Unauthorized: Token expired" });
      }
    }
  } else {
    return res.status(401).json({ message: "Unauthorized: Token expired" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader && authHeader.split(" ")[1];

  if (!refreshToken)
    return res.status(200).json({ message: "User logged out successfully" });

  res
    .status(200)
    .json({ message: "User logged out, refresh token is still active" });
};

export const authorizeRols = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "You are not authorized to access this route" });
    }
    next();
  };
};

export const forgotPassword = async (req, res, next) => {
  //Getting User based on posted email

  const employee = await Employee.findOne({ email: req.body.Email });

  if (!employee) {
    return next(new AppError("User Does not exist", 404));
  }

  // Generating random reset token

  const resetToken = employee.createPasswordResetToken();

  await employee.save({
    validateBeforeSave: false,
  });

  //(3) Send  Token to Via Email

  const resetURL = `${req.protocol}://${process.env.IP_ADDRESS}:${process.env.PORT}/api/v1/employees/forgotpassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: employee.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email",
    });
  } catch (error) {
    employee.passwordResetToken = undefined;
    employee.passwordResetExpires = undefined;

    await employee.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later"),
      500
    );
  }
};

export const resetPassword = CatchAsync(async (req, res, next) => {
  //1) Get user based on the token

  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const employee = await Employee.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!employee) {
    return next(new AppError("Token is invalid or has expires"));
  }

  //2) If token has not expired, and there is employee, set the new password
  employee.password = req.body.Password;
  employee.passwordResetToken = undefined;
  employee.passwordResetExpires = undefined;

  await employee.save();
});

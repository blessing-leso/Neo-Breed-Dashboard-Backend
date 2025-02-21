import { Employee } from "../models/Employees.js";
import bcrypt from "bcrypt";
import AppError from "../utils/AppError.js";
import sendEmail from "../utils/email.js";

import { Email as sendEmail } from "../utils/email.js";
import { CatchAsync } from "../utils/CatchAsync.js";
import crypto from "crypto";

export const setCompanyId = (req, res, next) => {
  if (!req.body.company) req.body.company = req.params.setCompanyId;
  next();
};

export const registerEmployee = async (req, res) => {
  const { Fullname, Email, Password, Phone, Address, JobTitle } = req.body;

  const newEmployee = new Employee({
    fullname: Fullname,
    email: Email,
    password: await bcrypt.hash(Password, 10),
    phone: Phone,
    address: Address,
    jobTitle: JobTitle,
    leads: [],
    clients: [],
  });

  try {
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate().select("-password");
    res.status(200).json(employees);
  } catch (error) {
    res.json({ error: error.message });
  }
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
  employee.password = await bcrypt.hash(req.body.Password, 10);
  employee.passwordResetToken = undefined;
  employee.passwordResetExpires = undefined;

  await employee.save();

  res.status(200).json({ message: "Password reset successful" });
});

//Filter Out the field an employeee can't update
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

/** ApI to update the users/employeee details */
export const updateEmployee = async (req, res) => {
  const filterBody = filterObj(
    req.body,
    "fullname",
    "phone",
    "address",
    "jobTitle"
  );

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      filterBody,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.json({ error: error.message });
  }
};

/**  ApI to delete  the user/employeee from database */
export const deleteEmployee = async (req, res, next) => {
  try {
    await Employee.findByIdAndDelete(req.params.id, { active: false });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const getEmployee = CatchAsync(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    return next(res.status(404).json({ error: "Employee not found" }));
  }

  res.status(200).json({
    data: {
      employee,
    },
  });
});

export const getMe = (req, res, next) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
};

// Function to get Employees along with clients and leads they are working with
export const getEmployeeWithDetails = async (req, res) => {
  const employee = await Employee.findOne({ fullname: req.body.Fullname })
    .populate("clients") // Get client details
    .populate("leads") // Get lead details
    .select("-password");
  res.json(employee);
};

import mongoose from "mongoose";
import crypto from "crypto";
const { Schema, model } = mongoose;

const employeeSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    jobTitle: { type: String },
    passwordResetToken: String,
    passwordResetExpires: String,
    role: { type: String, enum: ["admin", "employee"], default: "employee" }, //use this for role based access
    salary: { type: Number },
    leads: [{ type: Schema.Types.ObjectId, ref: "Lead" }], //reference to leads
    clients: [{ type: Schema.Types.ObjectId, ref: "Client" }], //reference to clients
  },
  { timestamps: true }
);

employeeSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export const Employee = model("Employee", employeeSchema);

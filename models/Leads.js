import mongoose from "mongoose";
const { Schema, model } = mongoose;

const LeadSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "lost", "converted"],
      default: "new",
    },
    company: { type: Schema.Types.ObjectId, ref: "Company" },
    interestedIn: [String], //eg ['software development', 'marketing', 'social media management']
    assignedTo: { type: Schema.Types.ObjectId, ref: "Employee" }, //reference to employee
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);

export const Lead = model("Lead", LeadSchema);

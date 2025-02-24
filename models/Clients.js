import mongoose from "mongoose";
const { Schema, model } = mongoose;

const clientSchema = new Schema(
  {
    fullname: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    serviceOffered: [String],
    status: {
      type: String,
      enum: ["new", "lost", "old", "converted"],
      default: "new",
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: "Employee" },
    company: { type: Schema.Types.ObjectId, ref: "Company" },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);

clientSchema.virtual("calls", {
  ref: "Call",
  foreignField: "client",
  localField: "_id",
});

export const Client = model("Client", clientSchema);

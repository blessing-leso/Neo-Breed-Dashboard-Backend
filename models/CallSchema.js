import { Model, Schema } from "mongoose";

const callSchema = new Schema(
  {
    callType: {
      type: String,
      enum: ["Incoming", "Outgoing", "Missed"],
    },
    callDuration: {
      type: Number,
      requited: true,
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
    recordingUrl: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);

export const Call = Model("Call", callSchema);

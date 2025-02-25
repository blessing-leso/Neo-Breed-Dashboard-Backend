import { model, Schema } from "mongoose";

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

callSchema.pre(/^find/, function (next) {
  this.populate({
    path: "employee",
    select: "-password",
  });
  this.populate({
    path: "client",
  });
  next();
});

export const Call = model("Call", callSchema);

import mongoose from "mongoose";
const { model, Schema } = mongoose;

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    Revenue: {
      type: Number,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);

CompanySchema.virtual("employees", {
  ref: "Employee",
  foreignField: "company",
  localField: "_id",
});

CompanySchema.virtual("clients", {
  ref: "Client",
  foreignField: "company",
  localField: "_id",
});

CompanySchema.virtual("leads", {
  ref: "Lead",
  foreignField: "company",
  localField: "_id",
});

CompanySchema.pre(/^find/, function (next) {
  this.populate({
    path: "employees",
    select: "-password",
  })
    .populate({
      path: "clients",
    })
    .populate({
      path: "leads",
    });

  next();
});

export const Company = model("Company", CompanySchema);

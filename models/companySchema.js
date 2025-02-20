import mongoose from "mongoose";
const { model, Schema } = mongoose;

const CompanySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  employees: [],
  client: [],
  Lead: [],
});

export const Company = model("Company", CompanySchema);

import { Company } from "../models/companySchema";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handleFactory";

export const createCompany = createOne(Company);
export const getCompanies = getAll(Company);
export const updateCompany = updateOne(Company);
export const deleteCompany = deleteOne(Company);
export const getOneCompany = getOne(Company);

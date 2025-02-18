import {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} from "../controllers/handleFactory.js";

import { Lead } from "../models/Leads.js";

export const createLead = createOne(Lead);
export const getLead = getOne(Lead);
export const getAllLeads = getAll(Lead);
export const updateLead = updateOne(Lead);
export const deleteLead = deleteOne(Lead);

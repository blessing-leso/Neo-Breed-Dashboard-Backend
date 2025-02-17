import { getOne, getAll, updateOne } from "./handleFactory";

import Lead from "../models/Leads";

export const createLead = getOne(Lead);
export const getLead = getOne(Lead);
export const getAllLeads = getAll(Lead);
export const updateLead = updateOne(Lead);
export const deleteLead = deleteOne(Lead);

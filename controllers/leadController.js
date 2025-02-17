import { getOne } from "./handleFactory";
import Lead from "../models/leadModel";

const createLead = getOne(Lead);
const getLead = getOne(Lead);
const getAllLeads = getAll(Lead);
const updateLead = updateOne(Lead);
const deleteLead = deleteOne(Lead);

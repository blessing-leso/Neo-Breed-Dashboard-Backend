import Lead from "../models/leadModel.js";
import { createOne } from "./handleFactory.js";

export const createLead = createOne(Lead);

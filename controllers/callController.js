import { Call } from "../models/CallSchema.js";
import { createOne, deleteOne, getAll, getOne } from "./handleFactory.js";

export const setClientandEmployeeId = (req, res, next) => {
  if (!req.body.client) req.body.client = req.params.id;
  //if (!req.body.employee) req.body.employee = req.employee.id;
  next();
};

export const createCall = createOne(Call);
export const getAllCalls = getAll(Call);
export const deleteCall = deleteOne(Call);
export const getCall = getOne(Call);

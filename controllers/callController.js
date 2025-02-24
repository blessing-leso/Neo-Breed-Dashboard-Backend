import { Call } from "../models/CallSchema.js";
import { createOne, deleteOne, getAll, getOne } from "./handleFactory.js";

export const createCall = createOne(Call);
export const getAllCalls = getAll(Call);
export const deleteCall = deleteOne(Call);
export const getCall = getOne(Call);

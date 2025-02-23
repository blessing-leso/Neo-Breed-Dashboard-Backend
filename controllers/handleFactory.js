import AppError from "../utils/AppError.js";
import { CatchAsync } from "../utils/CatchAsync.js";

export const createOne = (Model) =>
  CatchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({ doc });
  });

export const getOne = (Model) =>
  CatchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) return next(new AppError("No document found with that ID", 404));
    res.status(200).json({ doc });
  });

export const getAll = (Model) =>
  CatchAsync(async (req, res, next) => {
    const docs = await Model.find();
    res.status(200).json({ docs });
  });

export const updateOne = (Model) =>
  CatchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!doc) return next(new AppError("No document found with that ID", 404));
    res.status(200).json({ doc });
  });

export const deleteOne = (Model) =>
  CatchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    console.log(req.params.id);
    if (!doc) return next(new AppError("No document found with that ID", 404));
    res.status(204).json({ data: null });
  });

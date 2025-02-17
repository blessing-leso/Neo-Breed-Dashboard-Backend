import AppError from "../utils/AppError";
import { CatchAsync } from "../utils/CatchAsync";

export const createOne = (Model) => {
  CatchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({ doc });
  });
};

export const getOne = (Model) => {
  CatchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({ doc });
  });
};

export const getAll = (Model) => {
  CatchAsync(async (req, res, next) => {
    const docs = await Model.find();
    res.status(200).json({ docs });
  });
};

export const updateOne = (Model) => {
  CatchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({ doc });
  });
};

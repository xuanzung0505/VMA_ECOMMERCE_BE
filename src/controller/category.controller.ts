import { Request, Response } from "express";
import { categoryService } from "../service/category.service";
import httpStatus from "http-status";
import ExceptionCode from "../core/exception/exceptionCode";
import { catchAsync } from "../utils/catchAsync";

const create = catchAsync(async (req: Request, res: Response) => {
  // logger.info(req.body);
  const data = await categoryService.create(req.body);
  return res.send(data);
});

const getList = catchAsync(async (req: Request, res: Response) => {
  // logger.info(req.body);
  const data = await categoryService.getList();
  return res.send(data);
});

const getById = catchAsync(async (req: Request, res: Response) => {
  // logger.info(req.body);
  const data = await categoryService.getById(req.params.categoryId);
  if (!data) {
    throw new Error(
      `${httpStatus.NOT_FOUND}:${ExceptionCode.CATEGORY_NOT_FOUND}`
    );
  }
  return res.send(data);
});

export const categoryController = {
  create,
  getList,
  getById,
};

import { Request, Response } from "express";
import logger from "../utils/logger";
import { userService } from "../service/user.service";
import { omit } from "lodash";
import { catchAsync } from "../utils/catchAsync";
import httpStatus from "http-status";
import ExceptionCode from "../core/exception/exceptionCode";

const create = catchAsync(async (req: Request, res: Response) => {
  // logger.info(req.body);
  const data = await userService.create(req.body);
  return res.send(data);
});

const getList = catchAsync(async (req: Request, res: Response) => {
  // logger.info(req.body);
  const data = await userService.getList();
  return res.send(data);
});

const getById = catchAsync(async (req: Request, res: Response) => {
  // logger.info(req.body);
  const data = await userService.getById(req.params.userId);
  if (!data) {
    throw new Error(`${httpStatus.NOT_FOUND}:${ExceptionCode.USER_NOT_FOUND}`);
  }
  return res.send(data);
});

const updateById = catchAsync(async (req: Request, res: Response) => {
  // logger.info(req.body);
  const data = await userService.updateById(req.params.userId, req.body);
  if (!data) {
    throw new Error(`${httpStatus.NOT_FOUND}:${ExceptionCode.USER_NOT_FOUND}`);
  }
  return res.send(data);
});

export const userController = {
  create,
  getList,
  getById,
  updateById,
};

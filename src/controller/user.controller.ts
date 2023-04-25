import { Request, Response } from "express";
import logger from "../utils/logger";
import { userService } from "../service/user.service";
import { omit } from "lodash";
import { catchAsync } from "../utils/catchAsync";

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

export const userController = {
  create,
  getList,
};

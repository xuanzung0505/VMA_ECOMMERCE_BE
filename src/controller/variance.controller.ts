import { Request, Response } from "express";
import { varianceService } from "../service/variance.service";
import httpStatus from "http-status";
import ExceptionCode from "../core/exception/exceptionCode";
import { catchAsync } from "../utils/catchAsync";
import { pick } from "../utils/pick";
import { isNumber } from "lodash";

const create = catchAsync(async (req: Request, res: Response) => {
  // logger.info(req.body);
  const data = await varianceService.create(req.body);
  return res.send(data);
});

const getList = catchAsync(async (req: Request, res: Response) => {
  // logger.info(req.body);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const filter = pick(req.query, ["productId", "attribute"]);
  // console.log("body");
  // console.log(req.body);
  // const filterBody = pick(req.body, ["attribute"]);
  const data = await varianceService.getList(
    filter,
    //
    // filterBody,
    options
  );

  // console.log(parseInt(filter.maxPrice) == filter.maxPrice);
  // console.log(filter.keyword);

  return res.send(data);
});

const getById = catchAsync(async (req: Request, res: Response) => {
  // logger.info(req.body);
  const data = await varianceService.getById(req.params.varianceId);
  if (!data) {
    throw new Error(
      `${httpStatus.NOT_FOUND}:${ExceptionCode.VARIANCE_NOT_FOUND}`
    );
  }
  return res.send(data);
});

const updateById = catchAsync(async (req: Request, res: Response) => {
  // logger.info(req.body);
  const data = await varianceService.updateById(
    req.params.varianceId,
    req.body
  );
  if (!data) {
    throw new Error(
      `${httpStatus.NOT_FOUND}:${ExceptionCode.VARIANCE_NOT_FOUND}`
    );
  }
  return res.send(data);
});

export const varianceController = {
  create,
  getList,
  getById,
  updateById,
};

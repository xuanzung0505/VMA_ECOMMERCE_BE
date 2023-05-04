import { Request, Response } from "express";
import { productService } from "../service/product.service";
import httpStatus from "http-status";
import ExceptionCode from "../core/exception/exceptionCode";
import { catchAsync } from "../utils/catchAsync";
import { pick } from "../utils/pick";
import { isNumber } from "lodash";

const create = catchAsync(async (req: Request, res: Response) => {
  // logger.info(req.body);
  const data = await productService.create(req.body);
  return res.send(data);
});

const getList = catchAsync(async (req: Request, res: Response) => {
  // logger.info(req.body);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const filter = pick(req.query, [
    "keyword",
    "categoryId",
    "maxPrice",
    "minPrice",
  ]);
  const data = await productService.getList(filter, options);

  // console.log(parseInt(filter.maxPrice) == filter.maxPrice);
  // console.log(filter.keyword);

  return res.send(data);
});

const getById = catchAsync(async (req: Request, res: Response) => {
  // logger.info(req.body);
  const data = await productService.getById(req.params.productId);
  if (!data) {
    throw new Error(
      `${httpStatus.NOT_FOUND}:${ExceptionCode.PRODUCT_NOT_FOUND}`
    );
  }
  return res.send(data);
});

const updateById = catchAsync(async (req: Request, res: Response) => {
  // logger.info(req.body);
  const data = await productService.updateById(req.params.productId, req.body);
  if (!data) {
    throw new Error(
      `${httpStatus.NOT_FOUND}:${ExceptionCode.PRODUCT_NOT_FOUND}`
    );
  }
  return res.send(data);
});

export const productController = {
  create,
  getList,
  getById,
  updateById,
};

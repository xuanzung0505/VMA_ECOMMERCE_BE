import { Request, Response } from "express";
import { cartItemService } from "../service/cartItem.service";
import httpStatus from "http-status";
import ExceptionCode from "../core/exception/exceptionCode";
import { catchAsync } from "../utils/catchAsync";
import { pick } from "../utils/pick";

const create = catchAsync(async (req: Request, res: Response) => {
  const data = await cartItemService.create(req.body);
  return res.send(data);
});

const getList = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.query);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const filter = pick(req.query, ["userId", "varianceId"]);
  const data = await cartItemService.getList(filter, options);

  return res.send(data);
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const data = await cartItemService.getById(req.params.cartItemId);
  if (!data) {
    throw new Error(
      `${httpStatus.NOT_FOUND}:${ExceptionCode.CART_ITEM_NOT_FOUND}`
    );
  }
  return res.send(data);
});

const updateById = catchAsync(async (req: Request, res: Response) => {
  const data = await cartItemService.updateById(
    req.params.cartItemId,
    req.body
  );
  if (!data) {
    throw new Error(
      `${httpStatus.NOT_FOUND}:${ExceptionCode.CART_ITEM_NOT_FOUND}`
    );
  }
  return res.send(data);
});

export const cartItemController = {
  create,
  getList,
  getById,
  updateById,
};

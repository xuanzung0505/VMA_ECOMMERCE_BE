import { Request, Response } from "express";
import { categoryService } from "../service/category.service";

const create = async (req: Request, res: Response) => {
  // logger.info(req.body);
  const data = await categoryService.create(req.body);
  return res.send(data);
};

const getList = async (req: Request, res: Response) => {
  // logger.info(req.body);
  const data = await categoryService.getList();
  return res.send(data);
};

export const categoryController = {
  create,
  getList,
};

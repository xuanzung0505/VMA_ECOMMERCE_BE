import { Request, Response } from "express";
import { productService } from "../service/product.service";
import httpStatus from "http-status";
import ExceptionCode from "../core/exception/exceptionCode";
import { catchAsync } from "../utils/catchAsync";
import { pick } from "../utils/pick";
import { isNumber } from "lodash";
import { authService } from "../service/auth.service";

const login = catchAsync(async (req: Request, res: Response) => {
  // logger.info(req.body);
  const data = await authService.login(req.body);
  // if (!!data.user) {
  //   res.cookie("token", data.token, {
  //     httpOnly: true,
  //   });
  // }
  return res.send(data);
});

export const authController = {
  login,
};

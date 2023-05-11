import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";
import { RequestParams } from "../types/enumTypes";

const cookieJwtAuth = (req: Request, res: Response, next: NextFunction) => {
  // const token = req.cookies.token;
  // console.log("req");
  const token = req.headers.authorization?.replace("Bearer ", "");
  // console.log(req.headers);
  // console.log("token");
  // console.log(token);
  try {
    const user = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    // console.log(user);
    req[RequestParams.USERID] = user[RequestParams.USERID];
    // req.userId = user._id;
    // console.log(req.userId);
    next();
  } catch (error) {
    // logger.error(error);
    // res.clearCookie("token");
    // logger.info("clear token");
    // next();
    return res.status(401).send("token expired");
  }
};

export { cookieJwtAuth };

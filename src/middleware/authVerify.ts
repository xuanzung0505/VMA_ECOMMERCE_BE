import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";

const cookieJwtAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie("token");
    // logger.info("clear token");
    // next();
    return res.status(401).send("token expired");
  }
};

export { cookieJwtAuth };

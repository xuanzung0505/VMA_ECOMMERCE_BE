import express from "express";
import router from "./routes";

import httpStatus from "http-status";
import logger from "./utils/logger";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
//cors
app.use(cors());
//cookie parser
app.use(cookieParser());
//api
app.use("/api", router);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  logger.error(`${httpStatus.NOT_FOUND}, "Not found"`);
  throw new Error(`${httpStatus.NOT_FOUND}, "Not found"`);
});

export default app;

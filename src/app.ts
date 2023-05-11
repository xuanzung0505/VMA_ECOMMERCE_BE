import express from "express";
import router from "./routes";

import httpStatus from "http-status";
import logger from "./utils/logger";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsConfig } from "./config/corsConfig";

const app = express();

// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
//cors
app.use(cors(corsConfig));
//cookie parser
app.use(cookieParser());
//header
// app.use((req, res, next) => {
//   // res.setHeader()
//   // res.header("Content-Type", "application/json;charset=UTF-8");
//   // res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Origin", "http://localhost:8080");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// api
app.use("/api", router);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  logger.error(`${httpStatus.NOT_FOUND}, "Not found"`);
  throw new Error(`${httpStatus.NOT_FOUND}, "Not found"`);
});

export default app;

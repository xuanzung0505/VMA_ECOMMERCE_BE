import config from "config";
import logger from "./utils/logger";
import app from "./app";
import connect from "./utils/connect";

import path from "path";

import dotenv from "dotenv";
//dotenv
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const port = config.get<number>("port");

let server;

server = app.listen(port, async () => {
  logger.info(`running on ${port}`);
  console.log(process.env.TEST);
  await connect();
});

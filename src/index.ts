import config from "config";
import logger from "./utils/logger";
import app from "./app";
import connect from "./utils/connect";

const port = config.get<number>("port");

let server;

server = app.listen(port, async () => {
  logger.info(`running on ${port}`);
  await connect();
});

import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connect() {
  const dbUri = config.get<string>("dbUri");
  try {
    await mongoose.connect(dbUri).then(() => {
      logger.info("connected to DB");
    });
  } catch (err) {
    logger.error(err);
    logger.error("cannot connect to DB");
    process.exit(1);
  }
}

export default connect;

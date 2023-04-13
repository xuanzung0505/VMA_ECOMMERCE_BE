import pino from "pino";
import pretty from "pino-pretty";
import dayjs from "dayjs";

const logger = pino(
  pretty({
    customPrettifiers: {
      time: () => {
        return `[${dayjs().format()}]`;
      },
    },
  })
);

export default logger;

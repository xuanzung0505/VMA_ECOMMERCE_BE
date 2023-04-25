import { boolean, object, string } from "zod";
import { customValidations } from "./custom.validation";
import logger from "../utils/logger";

const create = object({
  body: object({
    title: string({
      required_error: "title is required",
    }),
    imgPath: string({
      required_error: "imgPath is required",
    }),
    isActive: boolean({
      required_error: "isActive is required",
    }),
  }),
});

const getById = object({
  params: object({
    categoryId: string({
      required_error: "categoryId is required",
    }).refine(
      (data) => {
        return customValidations.objectId(data, logger) === data;
      },
      {
        message: "must be a valid mongo id",
      }
    ),
  }),
});

export const categoryValidation = {
  create,
  getById,
};

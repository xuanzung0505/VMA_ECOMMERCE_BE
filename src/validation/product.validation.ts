import { array, boolean, number, object, string } from "zod";
import { customValidations } from "./custom.validation";
import logger from "../utils/logger";
import { isNull, isUndefined } from "lodash";

const create = object({
  body: object({
    title: string({
      required_error: "title is required",
    }),
    unitPrice: number({
      required_error: "unitPrice is required",
    }),
    quantity: number({
      required_error: "quantity is required",
    }),
    logo: string({
      required_error: "logo is required",
    }),
    imgPath: array(
      object(
        {
          path: string(),
        },
        { required_error: "path is required" }
      )
    ),
    categoryId: string({
      required_error: "categoryId is required",
    }),
  }),
});

const getList = object({
  query: object({
    categoryId: string()
      .refine(
        (data) => {
          return customValidations.objectId(data, logger) === data;
        },
        {
          message: "must be a valid mongo id",
        }
      )
      .optional(),
  }),
});

const getById = object({
  params: object({
    productId: string({
      required_error: "productId is required",
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

export const productValidation = {
  create,
  getList,
  getById,
};

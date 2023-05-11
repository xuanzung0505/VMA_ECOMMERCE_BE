import { array, boolean, number, object, string } from "zod";
import { customValidations } from "./custom.validation";
import logger from "../utils/logger";
import { isNull, isNumber, isUndefined } from "lodash";

const create = object({
  body: object({
    quantity: number({
      required_error: "quantity is required",
    }),
    varianceId: string({
      required_error: "productId is required",
    }).refine((data) => {
      return customValidations.objectId(data, logger) === data;
    }),
    userId: string({
      required_error: "userId is required",
    }).refine((data) => {
      return customValidations.objectId(data, logger) === data;
    }),
  }),
});

const getList = object({
  query: object({
    varianceId: string()
      .refine(
        (data) => {
          return customValidations.objectId(data, logger) === data;
        },
        {
          message: "must be a valid mongo id",
        }
      )
      .optional(),
    userId: string()
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
    cartItemId: string({
      required_error: "cartItemId is required",
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

const updateById = object({
  params: object({
    cartItemId: string({
      required_error: "cartItemId is required",
    }).refine(
      (data) => {
        return customValidations.objectId(data, logger) === data;
      },
      {
        message: "must be a valid mongo id",
      }
    ),
  }),
  body: object({
    quantity: number().optional(),
    ...customValidations.updateEntityValidation,
  }),
});

const deleteById = object({
  params: object({
    cartItemId: string({
      required_error: "cartItemId is required",
    }).refine(
      (data) => {
        return customValidations.objectId(data, logger) === data;
      },
      {
        message: "must be a valid mongo id",
      }
    ),
  }),
  body: object({
    quantity: number().optional(),
    ...customValidations.deleteEntityValidation,
  }),
});
export const cartItemValidation = {
  create,
  getList,
  getById,
  updateById,
  deleteById,
};

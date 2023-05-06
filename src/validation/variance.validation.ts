import { array, boolean, number, object, string } from "zod";
import { customValidations } from "./custom.validation";
import logger from "../utils/logger";
import { isNull, isNumber, isUndefined } from "lodash";

const create = object({
  body: object({
    unitPrice: number({
      required_error: "unitPrice is required",
    }),
    quantity: number({
      required_error: "quantity is required",
    }),
    productId: string({
      required_error: "productId is required",
    }).refine((data) => {
      return customValidations.objectId(data, logger) === data;
    }),
    attribute: array(
      object({
        title: string({ required_error: "attribute title is required" }),
        value: string(),
      })
    ),
  }),
});

const getList = object({
  query: object({
    productId: string()
      .refine(
        (data) => {
          return customValidations.objectId(data, logger) === data;
        },
        {
          message: "must be a valid mongo id",
        }
      )
      .optional(),
    attribute: string().optional(),
  }),
});

const getById = object({
  params: object({
    varianceId: string({
      required_error: "varianceId is required",
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
    varianceId: string({
      required_error: "varianceId is required",
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
    unitPrice: number().optional(),
    quantity: number().optional(),
    productId: string()
      .refine((data) => {
        return customValidations.objectId(data, logger) === data;
      })
      .optional(),

    attribute: array(
      object({
        title: string({ required_error: "attribute title is required" }),
        value: string(),
      })
    ).optional(),
  }),
});

export const varianceValidation = {
  create,
  getList,
  getById,
  updateById,
};

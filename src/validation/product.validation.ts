import { array, boolean, number, object, string } from "zod";
import { customValidations } from "./custom.validation";
import logger from "../utils/logger";
import { isNull, isNumber, isUndefined } from "lodash";

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
    }).refine((data) => {
      return customValidations.objectId(data, logger) === data;
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
    maxPrice: string()
      // .refine(
      //   (data: any) => {
      //     return !isNaN(data);
      //   },
      //   {
      //     message: "maxPrice is not a valid number",
      //   }
      // )
      .optional(),
    minPrice: string()
      // .refine(
      //   (data: any) => {
      //     return !isNaN(data);
      //   },
      //   {
      //     message: "minPrice is not a valid number",
      //   }
      // )
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

const updateById = object({
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
  body: object({
    title: string().optional(),
    unitPrice: number().optional(),
    quantity: number().optional(),
    logo: string().optional(),
    imgPath: array(
      object(
        {
          path: string(),
        },
        { required_error: "path is required" }
      )
    ).optional(),
    categoryId: string()
      .refine((data) => {
        return customValidations.objectId(data, logger) === data;
      })
      .optional(),
  }),
});

export const productValidation = {
  create,
  getList,
  getById,
  updateById,
};

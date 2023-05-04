import { boolean, object, string } from "zod";
import { z } from "zod";

import validator from "validator";
import { USER_TYPE } from "../types/enumTypes";
import { customValidations } from "./custom.validation";
import logger from "../utils/logger";

const create = object({
  body: object({
    name: string({
      required_error: "name is required",
    }),
    password: string({
      required_error: "password is required",
    }),
    passwordConfirmation: string({
      required_error: "password confirmation is required",
    }).min(6, "Password too short - must be 6 characters minimum"),
    tel: string({
      required_error: "tel is required",
    }).refine(validator.isMobilePhone, {
      message: "invalid tel",
      path: ["tel"],
    }),
    email: string({
      required_error: "email is required",
    }).email("Not a valid email"),
    userType: z.nativeEnum(USER_TYPE),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "passwords dont match",
    path: ["passwordConfirmation"],
  }),
});

const getById = object({
  params: object({
    userId: string({ required_error: "userId is required" }).refine((data) => {
      return customValidations.objectId(data, logger) === data;
    }),
  }),
});

const updateById = object({
  params: object({
    userId: string({ required_error: "userId is required" }).refine((data) => {
      return customValidations.objectId(data, logger) === data;
    }),
  }),
  body: object({
    name: string().optional(),
    tel: string()
      .refine(validator.isMobilePhone, {
        message: "invalid tel",
        path: ["tel"],
      })
      .optional(),
    email: string().email("Not a valid email").optional(),
    userType: z.nativeEnum(USER_TYPE),
  }),
});

export const userValidation = {
  create,
  getById,
  updateById,
};

import { object, string } from "zod";
import { z } from "zod";

import validator from "validator";
import { USER_TYPE } from "../types/enumTypes";

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

export const userValidation = {
  create,
};

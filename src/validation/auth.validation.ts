import { array, boolean, number, object, string } from "zod";
import { customValidations } from "./custom.validation";
import logger from "../utils/logger";
import { isNull, isNumber, isUndefined } from "lodash";

const login = object({
  body: object({
    email: string({
      required_error: "email is required",
    }).email("Invalid email address"),
    password: string({
      required_error: "password is required",
    }).min(6, "Your Password must be 6 characters minimum"),
  }),
});

export const authValidation = {
  login,
};

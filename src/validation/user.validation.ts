import { object, string } from "zod";

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
    email: string({
      required_error: "email is required",
    }).email("Not a valid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "passwords dont match",
    path: ["passwordConfirmation"],
  }),
});

export const userValidation = {
  create,
};

import { boolean, object, string } from "zod";

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

export const categoryValidation = {
  create,
};

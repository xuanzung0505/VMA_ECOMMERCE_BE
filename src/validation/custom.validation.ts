import { date, string } from "zod";
import logger from "../utils/logger";

const objectId = (value: any, helpers: any) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.error("must be a valid mongo id");
  }
  return value;
};

const createEntityValidation = {
  createdById: string().refine((data: any) => data === objectId(data, logger)),
};

const updateEntityValidation = {
  updatedById: string().refine((data: any) => data === objectId(data, logger)),
};

const deleteEntityValidation = {
  deletedById: string().refine((data: any) => data === objectId(data, logger)),
  deletedAt: date(),
};

export const customValidations = {
  objectId,
  createEntityValidation,
  updateEntityValidation,
  deleteEntityValidation,
};

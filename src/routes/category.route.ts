import express from "express";
import validate from "../middleware/validate";
import { categoryController } from "../controller/category.controller";
import { categoryValidation } from "../validation/category.validation";

const router = express.Router({ caseSensitive: true });

router
  .route("/")
  .get(
    //
    categoryController.getList
  )
  .post(
    //
    validate(categoryValidation.create),
    categoryController.create
  );

export const categoryRouter = router;

import express from "express";
import validate from "../middleware/validate";
import { productController } from "../controller/product.controller";
import { productValidation } from "../validation/product.validation";

const router = express.Router({ caseSensitive: true });

router
  .route("/")
  .get(
    //
    validate(productValidation.getList),
    productController.getList
  )
  .post(
    //
    validate(productValidation.create),
    productController.create
  );

router.route("/:productId").get(
  validate(productValidation.getById),
  //
  productController.getById
);

export const productRouter = router;

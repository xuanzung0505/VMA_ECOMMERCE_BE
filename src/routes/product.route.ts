import express from "express";
import validate from "../middleware/validate";
import { productController } from "../controller/product.controller";
import { productValidation } from "../validation/product.validation";
import { cookieJwtAuth } from "../middleware/authVerify";
import { addDataToBody } from "../middleware/addUserToBody";
import { RequestParams } from "../types/enumTypes";

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
    cookieJwtAuth,
    addDataToBody({
      createdById: RequestParams.USERID,
    }),
    validate(productValidation.create),
    productController.create
  );

router
  .route("/:productId")
  .get(
    validate(productValidation.getById),
    //
    productController.getById
  )
  .patch(
    cookieJwtAuth,
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(productValidation.updateById),
    //
    productController.updateById
  );

export const productRouter = router;

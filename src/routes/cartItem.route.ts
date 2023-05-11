import express from "express";
import validate from "../middleware/validate";
import { cartItemController } from "../controller/cartItem.controller";
import { cartItemValidation } from "../validation/cartItem.validation";
import { cookieJwtAuth } from "../middleware/authVerify";
import { RequestParams } from "../types/enumTypes";
import { addDataToBody } from "../middleware/addUserToBody";

const router = express.Router({ caseSensitive: true });

router
  .route("/")
  .get(
    //
    cookieJwtAuth,
    validate(cartItemValidation.getList),
    cartItemController.getList
  )
  .post(
    //
    cookieJwtAuth,
    addDataToBody({
      createdById: RequestParams.USERID,
    }),
    validate(cartItemValidation.create),
    cartItemController.create
  );

router
  .route("/:cartItemId")
  .get(
    validate(cartItemValidation.getById),
    //
    cartItemController.getById
  )
  .patch(
    cookieJwtAuth,
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(cartItemValidation.updateById),
    //
    cartItemController.updateById
  )
  .delete(
    cookieJwtAuth,
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(cartItemValidation.deleteById),
    //
    cartItemController.deleteById
  );

export const cartItemRouter = router;

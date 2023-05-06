import express from "express";
import validate from "../middleware/validate";
import { cartItemController } from "../controller/cartItem.controller";
import { cartItemValidation } from "../validation/cartItem.validation";

const router = express.Router({ caseSensitive: true });

router
  .route("/")
  .get(
    //
    validate(cartItemValidation.getList),
    cartItemController.getList
  )
  .post(
    //
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
    validate(cartItemValidation.updateById),
    //
    cartItemController.updateById
  );

export const cartItemRouter = router;

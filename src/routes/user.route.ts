import express from "express";
import { userController } from "../controller/user.controller";
import { userValidation } from "../validation/user.validation";
import validate from "../middleware/validate";
import { addDataToBody } from "../middleware/addUserToBody";
import { RequestParams } from "../types/enumTypes";
import { cookieJwtAuth } from "../middleware/authVerify";

const router = express.Router({ caseSensitive: true });

router
  .route("/")
  .get(
    //
    validate(userValidation.getList),
    userController.getList
  )
  .post(
    //
    validate(userValidation.create),
    userController.create
  );

router
  .route("/:userId") //
  .get(
    //
    validate(userValidation.getById),
    userController.getById
  )
  .patch(
    //
    cookieJwtAuth,
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(userValidation.updateById),
    userController.updateById
  );

export const userRouter = router;

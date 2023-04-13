import express from "express";
import { userController } from "../controller/user.controller";
import { userValidation } from "../validation/user.validation";
import validate from "../middleware/validate";

const router = express.Router({ caseSensitive: true });

router
  .route("/")
  .get(
    //
    userController.getList
  )
  .post(
    //
    validate(userValidation.create),
    userController.create
  );

export const userRouter = router;

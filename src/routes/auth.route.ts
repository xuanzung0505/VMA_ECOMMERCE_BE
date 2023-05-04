import express from "express";
import { authValidation } from "../validation/auth.validation";
import validate from "../middleware/validate";
import { authController } from "../controller/auth.controller";

const router = express.Router({ caseSensitive: true });

router
  //
  .route("/login")
  .post(
    validate(authValidation.login),
    //
    authController.login
  );

export const authRouter = router;

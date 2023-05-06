import express from "express";
import validate from "../middleware/validate";
import { varianceController } from "../controller/variance.controller";
import { varianceValidation } from "../validation/variance.validation";

const router = express.Router({ caseSensitive: true });

router
  .route("/")
  .get(
    //
    validate(varianceValidation.getList),
    varianceController.getList
  )
  .post(
    //
    validate(varianceValidation.create),
    varianceController.create
  );

router
  .route("/:varianceId")
  .get(
    validate(varianceValidation.getById),
    //
    varianceController.getById
  )
  .patch(
    validate(varianceValidation.updateById),
    //
    varianceController.updateById
  );

export const varianceRouter = router;

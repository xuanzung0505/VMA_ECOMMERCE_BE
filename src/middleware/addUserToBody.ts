import { RequestParams } from "../types/enumTypes";

export const addDataToBody =
  (body: any) => (req: Request, res: Response, next: any) => {
    Object.keys(body).forEach((key) => {
      //   console.log(body[key]);
      //   console.log(req[body[key]]);
      //   console.log(req.userId);

      req.body[key] = req[body[key]];

      if (key == "deletedById") {
        req.body.deletedAt = new Date();
      }
    });
    // console.log(req.body);
    next();
  };

import express from "express";
import { userRouter } from "./user.route";

const router = express.Router({ caseSensitive: true });

const defaultRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

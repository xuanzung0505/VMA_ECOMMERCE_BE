import express from "express";
import { userRouter } from "./user.route";
import { categoryRouter } from "./category.route";

const router = express.Router({ caseSensitive: true });

const defaultRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/category",
    route: categoryRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

import express from "express";
import { userRouter } from "./user.route";
import { categoryRouter } from "./category.route";
import { productRouter } from "./product.route";
import { authRouter } from "./auth.route";
import { varianceRouter } from "./variance.route";
import { cartItemRouter } from "./cartItem.route";

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
  {
    path: "/product",
    route: productRouter,
  },
  {
    path: "/variance",
    route: varianceRouter,
  },
  {
    path: "/cartItem",
    route: cartItemRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

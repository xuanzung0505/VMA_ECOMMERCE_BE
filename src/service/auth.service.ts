import CategoryModel from "../models/category.model";
import UserModel from "../models/user.model";
import logger from "../utils/logger";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token";

const login = async (body: any) => {
  const { email, password } = body;

  //   logger.info(email + "," + password);

  const user = await UserModel.findOne({
    email: email,
    deletedById: { $exist: false },
  });
  // console.log(user);
  if (!!user) {
    let token = null;
    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      // delete user.password;
      // console.log(user.password);
      user.password = undefined;
      // console.log(user);
      token = generateToken(user);
      return { user, token };
    } else {
      throw new Error("invalid credentials");
    }
  } else {
    throw new Error("invalid credentials");
  }
};

export const authService = {
  login,
};

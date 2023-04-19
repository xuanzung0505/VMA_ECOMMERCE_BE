import { omit } from "lodash";
import UserModel from "../models/user.model";
import logger from "../utils/logger";

const create = (body: any) => {
  let user = new UserModel(body);
  // const filter = body.email;
  // const user = UserModel.findOneAndUpdate(filter, body, {
  //   new: true,
  //   timestamps: false,
  // });
  // logger.info(user);

  try {
    user = user.save();
  } catch (error: any) {
    logger.error(error.message);
    return error.message;
  }

  return user;
};

const getList = async () => {
  const data = UserModel.paginate();
  return data;
};

export const userService = {
  create,
  getList,
};

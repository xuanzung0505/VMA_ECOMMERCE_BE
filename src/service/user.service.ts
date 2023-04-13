import UserModel from "../models/user.model";
import logger from "../utils/logger";

const create = async (body: any) => {
  const filter = body.email;
  const user = new UserModel(body);

  // const user = UserModel.findOneAndUpdate(filter, body, {
  //   new: true,
  //   timestamps: false,
  // });
  // logger.info(user);

  try {
    await user.save();
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

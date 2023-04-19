import CategoryModel from "../models/category.model";
import logger from "../utils/logger";

const create = (body: any) => {
  let category = new CategoryModel(body);

  // const category = categoryModel.findOneAndUpdate(filter, body, {
  //   new: true,
  //   timestamps: false,
  // });
  // logger.info(category);

  try {
    category = category.save();
  } catch (error: any) {
    logger.error(error.message);
    return error.message;
  }

  return category;
};

const getList = async () => {
  const data = CategoryModel.paginate();
  return data;
};

export const categoryService = {
  create,
  getList,
};

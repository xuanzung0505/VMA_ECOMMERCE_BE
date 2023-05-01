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

const getList = async (filter: any, options: any) => {
  const data = CategoryModel.paginate(
    {
      ...filter,
    },
    { ...options }
  );
  return data;
};

const getById = async (categoryId: any) => {
  const data = CategoryModel.findOne({
    _id: categoryId,
    deletedById: { $exists: false },
  });
  return data;
};

export const categoryService = {
  create,
  getList,
  getById,
};

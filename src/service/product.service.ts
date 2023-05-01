import ProductModel from "../models/product.model";
import logger from "../utils/logger";

const create = (body: any) => {
  let product = new ProductModel(body);

  // const product = productModel.findOneAndUpdate(filter, body, {
  //   new: true,
  //   timestamps: false,
  // });
  // logger.info(product);

  try {
    product = product.save();
  } catch (error: any) {
    logger.error(error.message);
    return error.message;
  }

  return product;
};

const getList = async (filter: any, options: any) => {
  let title;
  if (!!filter.keyword) {
    title = RegExp(`${filter.keyword}`, "i");
    filter.title = title;
  }
  delete filter.keyword;

  console.log({ ...filter });

  const data = ProductModel.paginate(
    {
      ...filter,
      //
    },
    { ...options }
  );
  return data;
};

const getById = async (productId: any) => {
  const data = ProductModel.findOne({
    _id: productId,
    deletedById: { $exists: false },
  });
  return data;
};

export const productService = {
  create,
  getList,
  getById,
};

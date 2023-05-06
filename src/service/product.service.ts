import ProductModel from "../models/product.model";
import logger from "../utils/logger";

const create = async (body: any) => {
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

  if (
    !!filter.minPrice &&
    filter.minPrice != "undefined" &&
    !isNaN(filter.minPrice)
  ) {
    // filter.unitPrice = { $gte: filter.minPrice };
    if (!!filter.unitPrice === false) filter.unitPrice = {};
    filter.unitPrice.$gte = filter.minPrice;
    delete filter.minPrice;
  } else {
    delete filter.minPrice;
  }

  if (
    !!filter.maxPrice &&
    filter.maxPrice != "undefined" &&
    !isNaN(filter.maxPrice)
  ) {
    // filter.unitPrice = { $lte: filter.maxPrice };
    if (!!filter.unitPrice === false) filter.unitPrice = {};
    filter.unitPrice.$lte = filter.maxPrice;
    delete filter.maxPrice;
  } else {
    delete filter.maxPrice;
  }

  console.log({ ...filter });

  const data = await ProductModel.paginate(
    {
      ...filter,
      //
    },
    { ...options }
  );

  // console.log(data);
  // const arr = await data.docs;
  // console.log(arr);

  // arr.map((value: any, index: any) => {
  //   // console.log(value);
  //   if (index % 2 == 0)
  //     updateById(value._id, { vendorId: "6456c9e49aafa716e134a914" });
  //   else updateById(value._id, { vendorId: "643fc64bf7e940bccfef8544" });
  // });

  return data;
};

const getById = async (productId: any) => {
  const data = ProductModel.findOne({
    _id: productId,
    deletedById: { $exists: false },
  });
  return data;
};

const updateById = async (productId: any, body: any) => {
  const data = ProductModel.findOneAndUpdate(
    {
      _id: productId,
      deletedById: { $exists: false },
    },
    {
      ...body,
    },
    {
      new: true,
    }
  );
  return data;
};

export const productService = {
  create,
  getList,
  getById,
  updateById,
};

import CartItemModel from "../models/cartItem.model";
import logger from "../utils/logger";

const create = async (body: any) => {
  let cartItem = new CartItemModel(body);
  // let cartItem = CartItemModel.create(body);

  // const cartItem = cartItemModel.findOneAndUpdate(filter, body, {
  //   new: true,
  //   timestamps: false,
  // });
  // logger.info(cartItem);

  try {
    cartItem = cartItem.save();
  } catch (error: any) {
    logger.error(error.message);
    return error.message;
  }

  return cartItem;
};

const getList = async (filter: any, /*filterBody: any,*/ options: any) => {
  const data = await CartItemModel.paginate(
    {
      ...filter,
      //
      // ...filterBody,
      deletedById: { $exists: false },
    },
    { ...options }
  );

  // data.docs.map((item: any, index: any) => {
  //   // console.log(item);
  //   updateById(item._id, { userId: "643fbef84e62ebd639739287" });
  // });

  return data;
};

const getById = async (cartItemId: any) => {
  const data = CartItemModel.findOne({
    _id: cartItemId,
    deletedById: { $exists: false },
  });
  return data;
};

const updateById = async (cartItemId: any, body: any) => {
  const data = CartItemModel.findOneAndUpdate(
    {
      _id: cartItemId,
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

const deleteById = async (cartItemId: any, body: any) => {
  const data = CartItemModel.findOneAndUpdate(
    {
      _id: cartItemId,
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

export const cartItemService = {
  create,
  getList,
  getById,
  updateById,
  deleteById,
};

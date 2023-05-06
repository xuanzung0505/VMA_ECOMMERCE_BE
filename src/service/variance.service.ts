import VarianceModel from "../models/variance.model";
import { beautify } from "../utils/beautify";
import logger from "../utils/logger";
import { stringToArray } from "../utils/stringToArray";

const create = async (body: any) => {
  let variance = new VarianceModel(body);

  // const variance = varianceModel.findOneAndUpdate(filter, body, {
  //   new: true,
  //   timestamps: false,
  // });
  // logger.info(variance);

  try {
    variance = variance.save();
  } catch (error: any) {
    logger.error(error.message);
    return error.message;
  }

  return variance;
};

const getList = async (filter: any, /*filterBody: any,*/ options: any) => {
  if (!!filter.attribute) {
    filter.attribute = stringToArray(filter.attribute);

    const attribute = { $all: filter.attribute };
    filter.attribute = attribute;
    // console.log(filter.attribute);
  }

  const data = VarianceModel.paginate(
    {
      ...filter,
      //
      // ...filterBody,
    },
    { ...options }
  );
  return data;
};

const getById = async (varianceId: any) => {
  const data = VarianceModel.findOne({
    _id: varianceId,
    deletedById: { $exists: false },
  });
  return data;
};

const updateById = async (varianceId: any, body: any) => {
  const data = VarianceModel.findOneAndUpdate(
    {
      _id: varianceId,
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

export const varianceService = {
  create,
  getList,
  getById,
  updateById,
};

import mongoose from "mongoose";
import { paginate } from "./plugins";
import { TABLE_PRODUCT, TABLE_VARIANCE } from "../config/table";
import { productPopulateFields } from "../config/populateConfig";

export interface VarianceDocument extends mongoose.Document {
  unitPrice: number;
  quantity: number;
  productId: mongoose.Types.ObjectId;
  attribute: Array<{
    title: string;
    value: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const varianceSchema = new mongoose.Schema(
  {
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_PRODUCT,
      required: true,
    },
    attribute: {
      type: Array<{
        title: string;
        value: string;
      }>,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//plugin
varianceSchema.plugin(paginate);

//set this to make virtual work
varianceSchema.set("toObject", { virtuals: true });
varianceSchema.set("toJSON", { virtuals: true });

//virtual
varianceSchema.virtual("product", {
  ref: TABLE_PRODUCT,
  localField: "productId",
  foreignField: "_id",
  justOne: true,
});

//populate for virtual
const populateArr = [
  {
    path: "product",
    select: productPopulateFields,
  },
];

//pre hooks
varianceSchema.pre("find", function () {
  this.populate(populateArr);
});

varianceSchema.pre("findOne", function () {
  this.populate(populateArr);
});

const VarianceModel = mongoose.model(TABLE_VARIANCE, varianceSchema);

export default VarianceModel;

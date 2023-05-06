import mongoose from "mongoose";
import { paginate } from "./plugins";
import { TABLE_CATEGORY, TABLE_PRODUCT, TABLE_USER } from "../config/table";
import {
  categoryPopulateFields,
  userPopulateFields,
} from "../config/populateConfig";

export interface ProductDocument extends mongoose.Document {
  title: string;
  unitPrice: number;
  quantity: number;
  logo: string;
  imgPath: Array<{
    path: string;
  }>;
  categoryId: mongoose.Types.ObjectId;
  attribute: Array<{
    title: string;
    value: Array<string>;
  }>;
  vendorId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    logo: { type: String, required: true },
    imgPath: { type: Array<{ path: String }>, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_CATEGORY,
      required: true,
    },
    attribute: {
      type: Array<{
        title: string;
        value: Array<string>;
      }>,
      required: false,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_USER,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//plugin
productSchema.plugin(paginate);

//set this to make virtual work
productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });

//virtual
productSchema.virtual("category", {
  ref: TABLE_CATEGORY,
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

productSchema.virtual("vendor", {
  ref: TABLE_USER,
  localField: "vendorId",
  foreignField: "_id",
  justOne: true,
});

//populate for virtual
const populateArr = [
  {
    path: "category",
    select: categoryPopulateFields,
  },
  {
    path: "vendor",
    select: userPopulateFields,
  },
];

//pre hooks
productSchema.pre("find", function () {
  this.populate(populateArr);
});

productSchema.pre("findOne", function () {
  this.populate(populateArr);
});

const ProductModel = mongoose.model(TABLE_PRODUCT, productSchema);

export default ProductModel;

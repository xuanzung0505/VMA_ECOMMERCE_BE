import mongoose from "mongoose";
import { paginate } from "./plugins";
import { TABLE_CATEGORY } from "../config/table";

export interface CategoryDocument extends mongoose.Document {
  title: string;
  imgPath: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imgPath: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

//plugin
categorySchema.plugin(paginate);

//pre hooks

const CategoryModel = mongoose.model(TABLE_CATEGORY, categorySchema);

export default CategoryModel;

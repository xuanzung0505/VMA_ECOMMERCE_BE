import mongoose from "mongoose";
import { paginate } from "./plugins";

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

//pre hooks

//plugin
categorySchema.plugin(paginate);

const CategoryModel = mongoose.model("category", categorySchema);

export default CategoryModel;

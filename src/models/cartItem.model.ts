import mongoose from "mongoose";
import { paginate } from "./plugins";
import {
  TABLE_CART_ITEM,
  TABLE_PRODUCT,
  TABLE_USER,
  TABLE_VARIANCE,
} from "../config/table";
import {
  userPopulateFields,
  variancePopulateFields,
} from "../config/populateConfig";

export interface CartItemDocument extends mongoose.Document {
  quantity: number;
  varianceId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdById: mongoose.Types.ObjectId;
  updatedById: mongoose.Types.ObjectId;
  deletedById: mongoose.Types.ObjectId;
}

const cartItemSchema = new mongoose.Schema(
  {
    quantity: { type: Number, required: true },
    varianceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_VARIANCE,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_USER,
      required: true,
    },
    deletedAt: { type: Date, required: false },
    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_USER,
      required: false,
    },
    updatedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_USER,
      required: false,
    },
    deletedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_USER,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

//plugin
cartItemSchema.plugin(paginate);

//set this to make virtual work
cartItemSchema.set("toObject", { virtuals: true });
cartItemSchema.set("toJSON", { virtuals: true });

//virtual
cartItemSchema.virtual("variance", {
  ref: TABLE_VARIANCE,
  localField: "varianceId",
  foreignField: "_id",
  justOne: true,
});

//virtual
cartItemSchema.virtual("user", {
  ref: TABLE_USER,
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

//populate for virtual
const populateArr = [
  {
    path: "variance",
    select: variancePopulateFields,
  },
  {
    path: "user",
    select: userPopulateFields,
  },
];

//pre hooks
cartItemSchema.pre("find", function () {
  this.populate(populateArr);
});

cartItemSchema.pre("findOne", function () {
  this.populate(populateArr);
});

cartItemSchema.post("save", function (doc: CartItemDocument, next: any) {
  // console.log("post Save");
  if (!!doc) {
    doc.populate(populateArr).then(() => {
      next();
    });
  } else {
    next();
  }
});

const CartItemModel = mongoose.model(TABLE_CART_ITEM, cartItemSchema);

export default CartItemModel;

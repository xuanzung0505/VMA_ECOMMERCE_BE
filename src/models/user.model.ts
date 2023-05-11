import mongoose from "mongoose";
import logger from "../utils/logger";
import bcrypt from "bcrypt";
import config from "config";
import { paginate } from "./plugins";
import { TABLE_USER } from "../config/table";

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  tel: string;
  userType: string;
  password: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdById: mongoose.Types.ObjectId;
  updatedById: mongoose.Types.ObjectId;
  deletedById: mongoose.Types.ObjectId;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tel: { type: String, required: true },
    userType: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false },
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

//methods
userSchema.methods.comparePassword = async (
  CandidatePassword: string
): Promise<boolean> => {
  const user = this as unknown as UserDocument;

  return bcrypt.compare(CandidatePassword, user.password).catch((err) => false);
};

//pre hooks
userSchema.pre("save", async function (next: any) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error: any) {
    return next(error);
  }
});

//plugin
userSchema.plugin(paginate);

const UserModel = mongoose.model(TABLE_USER, userSchema);

export default UserModel;

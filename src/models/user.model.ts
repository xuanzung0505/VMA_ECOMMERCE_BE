import mongoose from "mongoose";
import logger from "../utils/logger";
import bcrypt from "bcrypt";
import config from "config";
import { paginate } from "./plugins";

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  tel: string;
  userType: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    tel: { type: String, require: true },
    userType: { type: String, require: true },
    password: { type: String, require: true },
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

const UserModel = mongoose.model("user", userSchema);

export default UserModel;

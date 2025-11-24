import mongoose, { Schema } from "mongoose";
import { User } from "../types/User.model.type";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const Userschema: Schema<User> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    verifyCode: String,
    verifyCodeExpiry: {
      type: Date,
      default: Date.now(),
    },
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

Userschema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return null;
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

Userschema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.passwordHash);
};

Userschema.methods.isVerifyCodeExpired = async function () {
  return this.verifyCodeExpiry > Date.now();
};

Userschema.methods.generateAuthToken =async function () {
  const token =await jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m" }
  );
  return token;
};

const UserController = mongoose.model<User>("User", Userschema);
export default UserController;

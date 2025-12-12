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
      default: () => Date.now() + 10 * 60 * 10000,
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
  // console.log("Comparing password:", password, "with hash:", this.passwordHash, this._id, this.email, this.name);
  return await bcrypt.compare(password, this.passwordHash);
};

Userschema.methods.isVerifyCodeExpired = async function () {
  console.log(
    "code expiry time:",
    this.verifyCodeExpiry,
    "current time:",
    new Date(Date.now())
  );
  const currentTime = new Date(Date.now());
  return this.verifyCodeExpiry > currentTime;
};

Userschema.methods.generateAuthToken = async function () {
  console.log(
    "Generating auth token for user:",
    this._id,
    this.email,
    this.name
  );
  const token = await jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "24h" }
  );
  return token;
};

const UserController = mongoose.model<User>("User", Userschema);
export default UserController;

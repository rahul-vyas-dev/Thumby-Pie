import mongoose, { Schema } from "mongoose";
import { User } from "../types/User.model.type";
import bcrypt from "bcryptjs";

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

const UserController = mongoose.model<User>("User", Userschema);
export default UserController;

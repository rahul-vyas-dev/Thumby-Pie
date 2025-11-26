import { Document } from "mongoose";

export interface User extends Document {
  name: string;
  email: { type: string; unique: true };
  passwordHash: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAuthToken(): Promise<string>;
  isVerifyCodeExpired(): boolean;
  createdAt: { type: Date; default: Date };
}

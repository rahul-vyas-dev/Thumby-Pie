import UserController from "../models/User.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { User } from "../types/User.model.type";
dotenv.config();

export const VerifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req?.cookies?.accessToken ||
          req.headers["authorization"]?.replace("Bearer ", "");
      
    if (!token) {
      throw new ApiError(401, "not authorized!");
    }
    const DecodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    if (typeof DecodedUser === "string") {
      throw new Error("Invalid token payload");
    }

    const DecodedUserInfo = DecodedUser as User;
    const user = await UserController.findById(DecodedUserInfo._id).select(
      "-passwordHash"
    );

    if (!user) {
      throw new ApiError(401, "Not authorized, user not found");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("error in JWT auth", error);
      throw new ApiError(401, "Not authorized, token failed", error);
  }
};

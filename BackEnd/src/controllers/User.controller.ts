import { Request, Response } from "express";
import UserController from "../models/User.model";
import { User } from "../types/User.model.type";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { sendEmail } from "../helpers/SendEmail";

export const SignUp = async (
  req: Request,
  res: Response<ApiResponse<User>>
) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      throw new ApiError(400, "All fields are required");
    }
    const isUserExists = await UserController.findOne({ email });
    if (isUserExists) {
      return res.json({
        success: false,
        message: "User already exists with this Email",
      });
    }
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const response: User = await UserController.create({
      name,
      email,
      passwordHash: password,
      verifyCode,
    });
    if (!response) {
      throw new ApiError(500, "Interal server Error!!");
    }

    const token = await response.generateAuthToken();
    const emailResponse = await sendEmail({ name, verifyCode, email });
    if (!emailResponse.success) {
      throw new ApiError(500, "Internal server Error");
    }
    return res
      .cookie("accessToken", token, {
        httpOnly: true, // JS cannot access it
        secure: process.env.NODE_ENV === "production", // only over HTTPS
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hour
      })
      .json({
        success: true,
        statusCode: 200,
        message: "User Sign-Up successfully",
        accessToken: token,
      });
  } catch (error) {
    console.log(
      "error in registering user ->(src :: app :: api :: signUp :: route)",
      error
    );
    return Response.json(
      {
        success: false,
        message: "error in registering user",
      },
      {
        status: 500,
      }
    );
  }
};

export const SignIn = async (
  req: Request,
  res: Response<ApiResponse<User>>
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      throw new ApiError(401, "Email and Password are required");

    const isUserExists = await UserController.findOne({ email }).select(
      "-passwordHash"
    );

    if (!isUserExists) throw new ApiError(401, "not a valid Email");

    const isPasswordValid = isUserExists.isPasswordCorrect(password);
    if (!isPasswordValid) throw new ApiError(401, "Password is Incorrect");

    const token = await isUserExists.generateAuthToken();

    res
      .cookie("accessToken", token, {
        httpOnly: true, // JS cannot access it
        secure: process.env.NODE_ENV === "production", // only over HTTPS
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hour
      })
      .json({
        success: true,
        message: "User login successfully",
        data: isUserExists,
        statusCode: 200,
        accessToken: token,
      });
  } catch (error) {
    throw new ApiError(500, "error during Sign-In ", error);
  }
};
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
      throw new ApiError(
        400,
        "All fields are required",
        "All fields are required"
      );
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
      throw new ApiError(
        500,
        "Interal server Error!!",
        "Interal server Error!!"
      );
    }

    const token = await response.generateAuthToken();
    const emailResponse = await sendEmail({ name, verifyCode, email });
    if (!emailResponse.success) {
      await UserController.findByIdAndDelete(response._id);
      throw new ApiError(500, "Internal server Error", "Internal server Error");
    }
    return res
      .cookie("accessToken", token, {
        httpOnly: true, // JS cannot access it
        secure: process.env.NODE_ENV === "production", // only over HTTPS
        // sameSite: "strict",
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
    throw new ApiError(500, "error in registering user", error);
    // return Response.json(
    //   {
    //     success: false,
    //     message: "error in registering user",
    //   },
    //   {
    //     status: 500,
    //   }
    // );
  }
};

export const SignIn = async (
  req: Request,
  res: Response<ApiResponse<User>>
) => {
  try {
    const email = req.body?.email;
    const password = req.body?.password;

    if (!email || !password)
      throw new ApiError(
        401,
        "Email and Password are required",
        "Email and Password are required"
      );

    const isUserExists = await UserController.findOne({ email }).select(
      "-passwordHash -verifyCodeExpiry -verifyCode"
    );

    if (!isUserExists)
      throw new ApiError(401, "not a valid Email", "not a valid Email");
    const userWithPassword = await UserController.findOne({ email });
    const isPasswordValid = await userWithPassword!.isPasswordCorrect(password);
    if (!isPasswordValid)
      throw new ApiError(401, "Password is Incorrect", "Password is Incorrect");

    const token = await isUserExists.generateAuthToken();

    res
      .cookie("accessToken", token, {
        httpOnly: true, // JS cannot access it
        secure: process.env.NODE_ENV === "production", // only over HTTPS
        sameSite: "none",
        maxAge: 60 * 60 * 1000, // 1 hour
      })
      .json({
        success: true,
        message: "User login successfully",
        data: [isUserExists],
        statusCode: 200,
        accessToken: token,
      });
  } catch (error) {
    console.log("error during Sign-In ", error);
    throw new ApiError(500, "error during Sign-In ", error);
  }
};

export const verifyCode = async (
  req: Request,
  res: Response<ApiResponse<User>>
) => {
  try {
    const email = req.body?.email;
    const verifyCode = req.body?.verifyCode;
    if (!email || !verifyCode)
      throw new ApiError(
        401,
        "Email and verifyCode are required",
        "Email and verifyCode are required"
      );

    const user = await UserController.findOne({ email });
    if (!user)
      throw new ApiError(401, "not a valid Email", "not a valid Email");
    if (user.verifyCode !== verifyCode)
      throw new ApiError(401, "Invalid verify code", "Invalid verify code");
    const IsCodeNotExpired = user.isVerifyCodeExpired();
    console.log(IsCodeNotExpired);
    if (!IsCodeNotExpired)
      throw new ApiError(
        401,
        "Verify code has expired",
        "Verify code has expired"
      );

    return res.json({
      success: true,
      message: "Verify code is valid",
      statusCode: 200,
      data: [user],
    });
  } catch (error) {
    console.log("error during verify code ", error);
    throw new ApiError(500, "error during verify code ", error);
  }
};

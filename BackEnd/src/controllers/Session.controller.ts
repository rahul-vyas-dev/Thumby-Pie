import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import SessionController from "../models/Session.model";
import { Session } from "../types/Session.model.type";
import { Request, Response } from "express";

const getUserAllSession = async (
  req: Request,
  res: Response<ApiResponse<Session>>
) => {
  try {
    const User = req?.user;
    if (!User) {
      throw new ApiError(401, "Unauthorized User");
    }
    const Sessions = await SessionController.find({
      userId: User._id,
    });

    if (!Sessions) {
      throw new ApiError(404, "No session found");
    }
    res.json({
      success: true,
      message: "Session found successfully",
      data: Sessions,
      statusCode: 200,
    });
  } catch (error) {}
};

const getSingleSession = () => { 
    
}
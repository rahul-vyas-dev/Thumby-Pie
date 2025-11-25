import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import HistoryController from "../models/History.model";
import { History } from "../types/History.model.type";
import { Request, Response } from "express";
import { DeleteFile } from "../utils/Cloudinary";

export const GetSessionHistory = async (
  req: Request,
  res: Response<ApiResponse<History>>
) => {
  try {
    const User = req?.user;
    if (!User) {
      throw new ApiError(401, "Not Authorized", "Not Authorized");
    }
    const sessionId = req.body?.sessionId;
    if (!sessionId) {
        throw new ApiError(400, "Session Id is required", "Session Id is required");
    }
    const SessionHistory = await HistoryController.find({
      userId: User._id,
      sessionId,
    }).sort({ createdAt: -1 });
    if (SessionHistory.length === 0) {
      throw new ApiError(404, "No History found", "No History found");
    }
    return res.json({
      success: true,
      message: "User Session History fetched successfully",
      data: SessionHistory,
      statusCode: 200,
    });
  } catch (error) {
    console.log("Internal server Error", error);
    throw new ApiError(500, "internal server Error", error);
  }
};

export const DeleteSessionChat = async (
  req: Request<{}, {}, { data: History }>,
  res: Response<ApiResponse<null>>
) => {
  try {
    const User = req?.user;
    if (!User) {
      throw new ApiError(401, "Not Authorized", "Not Authorized");
    }
    const data = req.body?.data;
    if (!data) {
      throw new ApiError(400, "History data is required", "History data is required");
    }
    const deleteResult = await HistoryController.deleteOne({
      _id: data._id,
      userId: User._id,
    });
    if (deleteResult.deletedCount === 0) {
      throw new ApiError(404, "No History found to delete", "No History found to delete");
    }
    data.ImagePublicId!.forEach(async (id) => {
      await DeleteFile(id);
    });
    data.AiImagePublicId!.forEach(async (id) => {
      await DeleteFile(id);
    });
    return res.json({
      success: true,
      message: "User Session Chat deleted successfully",
      data: [null],
      statusCode: 200,
    });
  } catch (error) {
    console.log("Internal server Error", error);
    throw new ApiError(500, "internal server Error", error);
  }
};

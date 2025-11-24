import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import HistoryController from "../models/History.model";
import { History } from "../types/History.model.type";
import { Request, Response } from "express";

export const GetSessionHistory = async (
  req: Request,
  res: Response<ApiResponse<History>>
) => {
  try {
    const User = req?.user;
    if (!User) {
      throw new ApiError(401, "Not Authorized");
    }
    const { sessionId } = req.body;
    if (!sessionId) {
      throw new ApiError(400, "Session Id is required");
    }
    const SessionHistory = await HistoryController.find({
      userId: User._id,
      sessionId,
    }).sort({ createdAt: -1 }); 
    if (!SessionHistory) {
      throw new ApiError(404, "No History found");
    }
    return res.json({
      success: true,
      message: "User Session History fetched successfully",
      data: SessionHistory,
      statusCode: 200,
    });
  } catch (error) {
      console.log('Internal server Error', error);
      throw new ApiError(500, 'internal server Error', error);
  }
};

export const DeleteSessionChat = async (req: Request<{}, {}, { data: History }>, res: Response<ApiResponse<null>>) =>
{
  try {
    const User = req?.user;
    if (!User) {
      throw new ApiError(401, "Not Authorized");
    }
    const { data } = req.body;
    if (!data) {
      throw new ApiError(400, "History data is required");    
    }
    const deleteResult = await HistoryController.deleteOne({
      _id: data._id,
      userId: User._id,
    });
    return res.json({
      success: true,
      message: "User Session Chat deleted successfully",
      data: [null],
      statusCode: 200,
    });
  } catch (error) {
    console.log
    ('Internal server Error', error);
    throw new ApiError(500, 'internal server Error', error);
  }
};

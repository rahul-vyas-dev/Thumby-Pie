import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import SessionController from "../models/Session.model";
import { Session } from "../types/Session.model.type";
import { Request, Response } from "express";
import HistoryController from "../models/History.model";
import { DeleteFile } from "../utils/Cloudinary";

export const GetUserAllSession = async (
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
    }).sort({ createdAt: -1 });

    if (!Sessions) {
      throw new ApiError(404, "No session found");
    }
    res.json({
      success: true,
      message: "Session found successfully",
      data: Sessions,
      statusCode: 200,
    });
  } catch (error) {
    console.log("error during getUserAllSession", error);
  }
};

export const DeleteSingleSession = async (
  req: Request,
  res: Response<ApiResponse<Session>>
) => {
  try {
    const User = req?.user;
    const { sessionId } = req?.body;
    if (!User) throw new ApiError(401, "User not authorized");
    if (!sessionId) throw new ApiError(400, "Session Id is required");

    const deletedSession = await SessionController.findOneAndDelete({
      userId: User._id,
      sessionId,
    });
    const UserDocuments = await HistoryController.find({ userId: User._id, sessionId });
   
    await Promise.all(
      UserDocuments.map(async (doc) => {
        doc.ImagePublicId!.forEach(async (id) => {
          await DeleteFile(id);
        });
        doc.AiImagePublicId!.forEach(async (id) => {
          await DeleteFile(id);
        });
        await HistoryController.findByIdAndDelete(doc._id);
      })
    ).catch((error) => {
      console.log("error during deleting user documents", error);
      throw new ApiError(500, "Internal server error", error);
    });

    if (!deletedSession) throw new ApiError(404, "Session not Exists");
    return res.json({
      success: true,
      message: "session deleted successfully",
      data: [deletedSession],
    });
  } catch (error) {
    console.log("error during getSingleSession", error);
    throw new ApiError(500, "error in get singlesession", error);
  }
};

export const EditSessionTitle = async (
  req: Request,
  res: Response<ApiResponse<Session>>
) => {
  try {
    const { sessionName, sessionId } = req?.body;
    const User = req?.user;
    if (!sessionId || !sessionName)
      throw new ApiError(400, "All parameters are Required!");
    if (!User) throw new ApiError(401, "User not authorized");

    const session = await SessionController.findOne({
      userId: User._id,
      sessionId,
    });
    if (!session) {
      throw new ApiError(404, "no Session found");
    }
    session?.sessionName != sessionName;
    await session.save();
    return res.json({
      success: true,
      message: "Title updated successfully",
      data: [session],
    });
  } catch (error) {
    console.log("error during edit Session Title", error);
    throw new ApiError(500, "error during edit Session Title", error);
  }
};

export const DeleteAllSession = async (
  req: Request,
  res: Response<ApiResponse<Session>>
) => {
  try {
    const User = req?.user;
    if (!User) {
      throw new ApiError(401, "User not Authorizd");
    }
    const deletedSession = await SessionController.deleteMany({
      userId: User._id,
    });

    const UserDocuments = await HistoryController.find({ userId: User._id });
   
    await Promise.all(
      UserDocuments.map(async (doc) => {
        doc.ImagePublicId!.forEach(async (id) => {
          await DeleteFile(id);
        });
        doc.AiImagePublicId!.forEach(async (id) => {
          await DeleteFile(id);
        });
        await HistoryController.findByIdAndDelete(doc._id);
      })
    ).catch((error) => {
      console.log("error during deleting user documents", error);
      throw new ApiError(500, "Internal server error", error);
    });

    if (!deletedSession) {
      throw new ApiError(404, "No Session found");
    }
    res.json({
      success: true,
      message: "History cleared successfully",
      statusCode: 200,
    });
  } catch (error) {
    console.log("error during deleting all Session", error);
    throw new ApiError(500, "Internal Server error", error);
  }
};

export const CreateNewSession = async (
    req: Request, res: Response<ApiResponse<Session>>) => { 
    try {
        const User = req?.user;
        if (!User) {
            throw new ApiError(401, "User not Authorized");
        }
        const { sessionId, sessionName = "Untitled Session" } = req?.body;
        if (!sessionId||!sessionName) {
            throw new ApiError(400, "Session Id and Session Name are required");
        }
        const newSession =await SessionController.create({
            sessionId,
            sessionName,
            userId: User._id
        });
        if (!newSession) {
            throw new ApiError(500,'Internal server Error')
        }
        return res.json({
            success: true,
            message: "session created successfully",
            data: [newSession],
            statusCode:200
        })
    } catch (error) {
        console.log('error during creating new Session', error);
        throw new ApiError(500,
            "Internal Server Error"
        )
    }
}
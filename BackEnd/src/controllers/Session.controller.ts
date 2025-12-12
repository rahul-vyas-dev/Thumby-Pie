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
      throw new ApiError(401, "Unauthorized User", "Unauthorized User");
    }
    const Sessions = await SessionController.find({
      userId: User._id,
    }).sort({ createdAt: -1 });

    if (!Sessions) {
      throw new ApiError(404, "No session found", "No session found");
    }
    console.log("all session", Sessions);
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
    const sessionId  = req?.body?.sessionId;
    if (!User) throw new ApiError(401, "User not authorized", "User not authorized");
    if (!sessionId) throw new ApiError(400, "Session Id is required", "Session Id is required");

    const deletedSession = await SessionController.findOneAndDelete({
      userId: User._id,
      sessionId,
    });
    const UserDocuments = await HistoryController.find({ userId: User._id, sessionId });
    console.log('UserDocuments', UserDocuments);
    if (UserDocuments.length !== 0) {
      console.log("No documents found for this session");
    
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
    }

    if (!deletedSession) throw new ApiError(404, "Session not Exists", "Session not Exists");
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
    const sessionName = req?.body?.sessionName;
    const sessionId = req?.body?.sessionId;
    const User = req?.user;
    if (!sessionId || !sessionName)
      throw new ApiError(400, "All parameters are Required!", "All parameters are Required!");
    if (!User) throw new ApiError(401, "User not authorized", "User not authorized");
    const session = await SessionController.findOne({
      userId: User._id,
      sessionId,
    });
    if (!session) {
      throw new ApiError(404, "no Session found", "no Session found");
    }
    session.sessionName = sessionName;
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
      throw new ApiError(401, "User not Authorized", "User not Authorized");
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
      throw new ApiError(404, "No Session found", "No Session found");
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
            throw new ApiError(401, "User not Authorized", "User not Authorized");
      }
      console.log('req.body session new', User);
        const  sessionId = req?.body?.sessionId;
        const sessionName = req?.body?.sessionName;
        if (!sessionId) {
            throw new ApiError(400, "Session Id and Session Name are required", "Session Id and Session Name are required");
      }
      const existingSession = await SessionController.findOne({userId: User._id, sessionId});
      if (existingSession) {
        throw new ApiError(409, 'Session with this ID already exists', 'Session with this ID already exists')
      }
        const newSession =await SessionController.create({
            sessionId,
            sessionName,
            userId: User._id
        });
        if (!newSession) {
            throw new ApiError(500,'Internal server Error', 'Internal server Error')
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
            "Internal Server Error", error
        )
    }
}
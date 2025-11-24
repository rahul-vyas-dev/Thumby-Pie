import { Document, Types } from "mongoose";

export interface History extends Document {
  userId: Types.ObjectId;
  sessionId: Types.ObjectId;
  imageUrl?: [string];
  GeneratedImageUrl?: [string];
  prompt: string;
  ImagePublicId?: [string];
  AiImagePublicId?: [string];
  createdAt: { type: Date; default: Date };
}
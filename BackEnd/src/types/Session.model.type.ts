import mongoose, { Document, Types } from "mongoose";

export interface Session extends Document { 
  sessionId: string,
  userId: Types.ObjectId,
  sessionName: { type: string, default: "Untitled Session" },
  createdAt?: { type: Date, default: Date },
  lastUpdated?: { type: Date, default: Date }
}
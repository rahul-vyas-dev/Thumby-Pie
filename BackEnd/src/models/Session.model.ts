import { Session } from "../types/Session.model.type";
import mongoose, { Schema } from "mongoose";

const SessionSchema: Schema<Session> = new Schema({
  sessionId: {
    type: String,
    required: true,
  },
  userId: {
    type: new mongoose.Schema.Types.ObjectId("User"),
    ref: "User",
    required:true
  },
  sessionName: { type: String, default: "Untitled Session" },
  createdAt: { type: Date, default: Date.now() },
  lastUpdated: { type: Date, default: Date.now() },
}, { timestamps: true });

const SessionController = mongoose.model<Session>('Session', SessionSchema);
export default SessionController;

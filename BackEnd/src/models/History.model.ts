import { History } from "../types/History.model.type";
import mongoose, { Schema } from "mongoose";

const HistorySchema: Schema<History> = new Schema(
  {
    userId: {
      type: new mongoose.Schema.Types.ObjectId("User"),
      ref: "User",
      required: true,
    },
    sessionId: {
      type: new mongoose.Schema.Types.ObjectId("Session"),
      ref: "Session",
      required: true,
    },
    imageUrl: { type: [String] },
    GeneratedImageUrl: { type: [String] },
    prompt: String,
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

const HistoryController = mongoose.model<History>("History", HistorySchema);
export default HistoryController;
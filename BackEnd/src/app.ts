import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import sessionRoutes from "./routes/session.routes";
import imageRoutes from "./routes/image.routes";
import userSessionHistoryRoutes from "./routes/sessionHistory.routes";
import AuthRoutes from "./routes/user.routes";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/ApiError";

dotenv.config();
const corsOptions = {
  // const corsOptions = { origin: '*' } // for development only
  origin: process.env.CORS_ORIGIN || "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  Credential: true,
};

const app: Application = express();

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(express.static("public"));


app.use("/api/v1/sessions", (req, res, next) =>
  Promise.resolve(sessionRoutes(req, res, next)).catch(next)
);
app.use("/api/v1/images", (req, res, next) =>
  Promise.resolve(imageRoutes(req, res, next)).catch(next)
);
app.use("/api/v1/session-history", (req, res, next) =>
  Promise.resolve(userSessionHistoryRoutes(req, res, next)).catch(next)
);
app.use("/api/v1/auth", (req, res, next) =>
  Promise.resolve(AuthRoutes(req, res, next)).catch(next)
);
app.use((err: any, req:Request, res:Response, next:NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err?.errors,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

export default app;
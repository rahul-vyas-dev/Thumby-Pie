import { User } from "./User.model.type";
import * as express from "express";
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

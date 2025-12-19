import { User } from "./User.model.type";
import * as express from "express";
declare global {
  namespace Express {
    namespace Multer {
      interface File {
        fieldname: string;

        originalname: string;

        encoding: string;

        mimetype: string;

        size: number;

        stream: Readable;

        destination: string;

        filename: string;

        path: string;

        buffer: Buffer;
      }
    }
    interface Request {
      user?: User;
    }
  }
}

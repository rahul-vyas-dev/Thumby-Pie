import { User } from "./User.model.type";
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

import { User } from "../models/userModels";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

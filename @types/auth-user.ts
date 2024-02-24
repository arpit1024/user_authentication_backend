import { User } from "../models/mongoModels";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

import { Service } from "typedi";
import UserModel from "../models/userModels";

// Database Queries Only No Business logic
@Service()
export class UserCollection {
  private userDataCollection;
  constructor() {
    this.userDataCollection = UserModel;
  }

  async findUserByEmail(email: string) {
    return await this.userDataCollection.findOne({ email }).lean();
  }

  async saveCollection(
    name: string,
    email: string,
    password: string,
    phone: string,
  ) {
    await new this.userDataCollection({
      name,
      email,
      password: password,
      phone,
    }).save();
  }
}

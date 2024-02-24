import { Service } from "typedi";
import UserModel from "../models/mongoModels";
@Service()
export class UserCollection {
  private userDataCollection;
  constructor() {
    this.userDataCollection = UserModel;
  }

  async findUserByEmail(email: string) {
    return this.userDataCollection.findOne({ email }).lean();
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

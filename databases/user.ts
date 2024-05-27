import { Service } from "typedi";
import UserModel from "../models/userModels";
import UserProfileDataModel, { UserProfileData } from "../models/userProfileModel";

// Database Queries Only No Business logic
@Service()
export class UserCollection {
  private userDataCollection;
  private userProfileDataCollection;
  constructor() {
    this.userDataCollection = UserModel;
    this.userProfileDataCollection = UserProfileDataModel;
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

  async findUserProfile(email: string) {
    return await this.userProfileDataCollection.findOne({ email }).lean();
  }
  async saveUserProfileData(userProfileData: UserProfileData) {
    await (new this.userProfileDataCollection(userProfileData)).save();
  }
}

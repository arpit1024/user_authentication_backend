import { Service } from "typedi";
import { UserCollection } from "../databases/user";
import bcrypt from "bcrypt";
import { User } from "../models/userModels";
import { PostCollection } from "../databases/posts";
import { UserProfileData } from "../models/userProfileModel";
interface IUserService {
  findUserByEmail(email: string): Promise<User | Error>;
  saveUserCollection(
    name: string,
    email: string,
    password: string,
    phone: string,
  ): void;
}
@Service()
export class UserService implements IUserService {
  constructor(private readonly userCollection: UserCollection, private readonly postCollection: PostCollection) {}

  async findUserByEmail(email: string) {
    const user = await this.userCollection.findUserByEmail(email);
    if (!user) {
      return new Error("No user found!");
    }
    return user;
  }

  async saveUserCollection(
    name: string,
    email: string,
    password: string,
    phone: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userCollection.saveCollection(
      name,
      email,
      hashedPassword,
      phone,
    );
  }

  async getUserPosts(email: string) {
    const posts = await this.postCollection.findUserPostByEmail(email);
    if (!posts) return 'No Posts found for this user';
    return posts;
  }


  async saveUserProfile(userProfile: UserProfileData) { 
    const user = await this.userCollection.findUserProfile(userProfile.email);
    if (user) return new Error('This user already added in the queue!');
    return this.userCollection.saveUserProfileData(userProfile);
  }
}

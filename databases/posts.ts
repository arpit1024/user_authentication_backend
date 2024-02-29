import { Service } from "typedi";
import PostModel from "../models/userPostsModel";

@Service()
export class PostCollection {
  private userPostCollection;
  constructor() {
    this.userPostCollection = PostModel;
  }

  // R => Read 
  async findUserPostByEmail(email: string) {
    return await this.userPostCollection.find({ email }).lean();
  }

  // C => Create  
  async createPost(email: string, message: string) {
    return await new this.userPostCollection({
      email,
      message
    }).save();
  }

  // D => Delete
  async deletePost() {
    
  }

  // U => Update
  async updatePost() {
    
  }
}

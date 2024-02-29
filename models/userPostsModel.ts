import mongoose, { Schema, Document } from "mongoose";

export interface Post extends Document {
  message: string;
  email: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema<Post>({
  email: { type: String, required: true },
  message: { type: String, required: true },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, required: true, default: new Date() },
  updatedAt: { type: Date, required: true, default: new Date() },
});

PostSchema.index({ email: 1 });

const PostModel = mongoose.model<Post>("Post", PostSchema);
export default PostModel;

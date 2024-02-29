import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const UserSchema: Schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
});

UserSchema.index({ phone: 1 });
UserSchema.index({ email: 1 });

const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;

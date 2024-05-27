import mongoose, { Schema } from "mongoose";

export interface UserProfileData {
  name?: string;
  email: string;
  password?: string;
  phone?: string;
  jobRole?: string;
  preferToLiveIn?: string;
  working?: 'fresher' | 'professional';
  companyLocation?: string;
  requiredAmountToRelocate?: number;
  reasonToRelocate?: string;
}

const UserProfileDataSchema: Schema = new Schema<UserProfileData>({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: String },
    jobRole: { type: String },
    preferToLiveIn: { type: String },
    working: { type: String, enum: ['fresher', 'professional'] },
    companyLocation: { type: String },
    requiredAmountToRelocate: { type: Number },
    reasonToRelocate: { type: String },
  });
  

  UserProfileDataSchema.index({ email: 1 });
  UserProfileDataSchema.index({ phone: 1 });
  
  const UserProfileDataModel = mongoose.model<UserProfileData>("UserProfileData", UserProfileDataSchema);

export default UserProfileDataModel;
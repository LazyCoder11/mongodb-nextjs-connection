import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  name?: string;
  email: string;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  name: { type: String },
  email: { type: String, required: true },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;

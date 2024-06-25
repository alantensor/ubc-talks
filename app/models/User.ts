import { Schema, model } from "mongoose";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  pinned: Array<string>;
  posts?: Array<number>; // Array of post IDs
  username: string;
  score?: number;
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  lastName: {
    type: String,
    required: true,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    max: 100,
    unique: true,
  },
  pinned: {
    type: [String],
    default: [],
  },
  posts: {
    type: [Number],
    default: [],
  },
  username: {
    type: String,
    required: true,
  },
  score: Number,
});

const User = model<IUser>("User", userSchema);
export default User;

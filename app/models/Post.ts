import { Schema, model, connect } from "mongoose";
import User from "./User";

interface IPost {
  id: number;
  title: string;
  description: string;
  channel_id: number;
  // upvotes: Array<typeof User>;
  upvote_count: number;
  // op: typeof User;
  createdAt: Date;
}

const postSchema = new Schema<IPost>({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  description: {
    type: String,
    required: true,
    max: 500,
  },
  channel_id: {
    type: Number,
    required: true,
  },
  // upvotes: {
  //   type: [User],
  //   default: [],
  // },
  upvote_count: {
    type: Number,
    default: 0,
  },
  // op: {
  //   type: User,
  //   required: true,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = model<IPost>("Post", postSchema);
export { Post };
export type { IPost };

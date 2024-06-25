import PostsWrapper from "@/app/ui/channelbox/posts-wrapper";
import Widgets from "@/app/ui/channelbox/widgets";
import { getPosts, getUsers, newPost } from "@/app/lib/data";
import connectDB from "@/app/lib/db";
import { Post, IPost } from "@/app/models/Post";
import { HydratedDocument } from "mongoose";

export default async function Page() {
  return (
    <>
      <div className="flex flex-col flex-1 py-5">
        <button className="btn btn-primary m-5 max-w-32">new post</button>
        <PostsWrapper />
      </div>
      <div className="flex flex-col flex-1 py-5">
        <Widgets />
      </div>
    </>
  );
}

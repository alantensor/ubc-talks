import User from "@/app/models/User";
import { Post } from "@/app/models/Post";
import connectDB from "./db";
import { connect } from "http2";

// *** CREATE ***

export async function newPost(post: typeof User) {
  try {
    await connectDB();
    const newpost = await Post.create(post);

    return { newpost };
  } catch (err) {
    return { err };
  }
}

export async function newUser(user: typeof User) {
  try {
    await connectDB();
    const newuser = await User.create(user);

    return { newuser };
  } catch (err) {
    return { err };
  }
}

// *** READ ***

export async function getPostsByChannel(channel: string) {
  try {
    await connectDB();
    const posts = await Post.find({ channel: channel });
    const results = posts.length;
    return {
      posts: posts,
      results: results,
    };
  } catch (err) {
    return { err };
  }
}

export async function getUsers() {
  try {
    await connectDB();

    const users = await User.find();
    const results = users.length;
    return {
      users: users,
      results: results,
    };
  } catch (err) {
    return { err };
  }
}

export async function getPosts() {
  try {
    await connectDB();
    const posts = await Post.find();
    const results = posts.length;
    return {
      posts: posts,
      results: results,
    };
  } catch (err) {
    return { err };
  }
}

// *** UPDATE ***

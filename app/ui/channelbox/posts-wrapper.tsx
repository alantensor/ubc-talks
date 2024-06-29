import Widgets from "./widgets";
import PostCard from "./post";
// import { headers } from "next/headers";
export default function PostsWrapper() {
  // const headersList = headers();
  // // const domain = headersList.get('host') || "";
  // const fullUrl = headersList.get("referer") || "";

  // console.log(fullUrl);
  // try {
  //   const posts = await getPostsByChannel("");
  // } catch (err) {
  //   console.error(err);
  // }

  const testposts = [
    {
      title: "Test Post 1",
      description: "This is a test post",
      op: "Test User",
      upvote_count: 0,
      createdAt: new Date(),
    },
    {
      title: "Test Post 2",
      description: "This is a test post",
      op: "Test User",
      upvote_count: 0,
      createdAt: new Date(),
    },
    {
      title: "Test Post 3",
      description: "This is a test post",
      op: "Test User",
      upvote_count: 0,
      createdAt: new Date(),
    },
    {
      title: "Test Post 4",
      description: "This is a test post",
      op: "Test User",
      upvote_count: 0,
      createdAt: new Date(),
    },
    {
      title: "Test Post 2",
      description: "This is a test post",
      op: "Test User",
      upvote_count: 0,
      createdAt: new Date(),
    },
    {
      title: "Test Post 3",
      description: "This is a test post",
      op: "Test User",
      upvote_count: 0,
      createdAt: new Date(),
    },
    {
      title: "Test Post 4",
      description: "This is a test post",
      op: "Test User",
      upvote_count: 0,
      createdAt: new Date(),
    },
  ];
  return (
    <>
      {testposts.map((post, i) => {
        return <PostCard key={i} post={post} />;
      })}
    </>
  );
}

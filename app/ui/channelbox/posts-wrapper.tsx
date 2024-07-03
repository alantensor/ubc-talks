import Widgets from "./widgets";
import PostCard from "./post";
import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";

export default async function PostsWrapper({ channel }: { channel: string }) {
  const supabase = createClient();
  //  const { data, error } = await supabase.auth.signInWithOAuth({
  //   provider: 'google',
  //  });
  const { data: posts } = await supabase
    .from("posts")
    .select()
    .eq("channel_id", channel);
  // console.log(posts);
  if (posts?.length == 0) return <p>no posts</p>;

  return (
    <>
      {posts!.map((post, i) => {
        return (
          <Link href={channel + "/post/" + post.id}>
            <PostCard key={i} post={post} />
          </Link>
        );
      })}
    </>
  );
}

import PostCard from "./post";
import { createClient } from "@/app/lib/supabase/server";

export default async function PostsWrapper({ channel }: { channel: string }) {
  const supabase = createClient();
  //  const { data, error } = await supabase.auth.signInWithOAuth({
  //   provider: 'google',
  //  });
  const { data: posts } = await supabase
    .from("posts")
    .select()
    .order("id", { ascending: false })
    .eq("channel_id", channel);
  // console.log(posts);
  if (posts?.length == 0)
    return (
      <div className="flex w-full  m-auto  justify-center items-center">
        no posts
      </div>
    );

  return (
    <>
      {posts!.map((post, i) => {
        return <PostCard key={i} post={post} />;
      })}
    </>
  );
}

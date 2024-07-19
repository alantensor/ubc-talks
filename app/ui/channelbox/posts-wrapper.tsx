import { User } from "@supabase/supabase-js";
import PostCard from "./post";
import { createClient } from "@/app/lib/supabase/server";

export default async function PostsWrapper({
  channel,
  user,
}: {
  channel: string;
  user: User | null;
}) {
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
  if (posts == null || posts?.length == 0)
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

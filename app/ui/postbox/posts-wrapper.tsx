import PostCard from "@/app/ui/channelbox/post";
import { createClient } from "@/app/lib/supabase/server";

export default async function PostsWrapper({ postid }: { postid: number }) {
  const supabase = createClient();
  //  const { data, error } = await supabase.auth.signInWithOAuth({
  //   provider: 'google',
  //  });
  const { data: posts } = await supabase
    .from("posts")
    .select()
    .eq("id", postid);
  // console.log(posts);

  if (posts) {
    return (
      <>
        <PostCard key={postid} post={posts[0]} />;{/* comments */}
      </>
    );
  } else {
    return <>Post not found</>;
  }
}

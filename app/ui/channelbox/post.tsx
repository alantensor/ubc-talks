import { createClient } from "@/app/lib/supabase/server";
import UpvoteBar from "./upvoteBar";
export default async function PostCard({
  post,
}: {
  post: {
    id: number;
    created_at: Date;
    op: string;
    title: string;
    body: string;
    upvotes: string[]; // to avoid multiple from same user
    downvotes: string[];
    views: number;
    channel_id: string;
  };
}) {
  const supabase = createClient();
  let postcolor = "blue";
  const { op, title, body, channel_id, upvotes, downvotes } = post;
  const { data } = await supabase.auth.getUser();

  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <div className="relative w-4/5 min-h-96 bg-slate-900 text-white rounded-box p-7 my-2 space-y-5">
      <h2 className="font-bold">r/{decodeURIComponent(channel_id)}</h2>
      <h1 className="text-lg">{title}</h1>
      <p className="text-neutral-400">{truncateText(body, 500)}</p>
      <p className=" absolute top-2 right-4 text-xs">
        Posted by {(op == data?.user?.id && "Me") || "anonymous"}
      </p>
      <UpvoteBar post={post} user={data?.user?.id || "anonymous"} />
    </div>
  );
}

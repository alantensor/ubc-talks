import { createClient } from "@/app/lib/supabase/server";
export default async function PostCard({
  post, 
}: {
  post: {
    id: number;
    created_at: string;
    op: string;
    title: string;
    body: string;
    upvotes: number;
    downvotes: number;
    views: number;
    channel_id: string;
  };
}) {
  const supabase = createClient();
  let postcolor = "blue";
  const { op, title, body, channel_id } = post;
  const { data } = await supabase.auth.getUser();

  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };
  return (
    <div className="relative w-4/5 min-h-96 bg-slate-900 rounded-box p-7 m-4 space-y-5">
      <h2>r/{channel_id}</h2>
      <h1>{title}</h1>
      <p>{body}</p>
      <p className="text-slate-500 absolute top-2 right-4 text-xs">
        Posted by {(op == data?.user?.id && "Me") || "anonymous"}
      </p>
      <div className="join absolute bottom-0 left-5 ">
        <button className="btn btn-ghost join-item bg-slate-900 text-slate-500 hover:text-white hover:bg-slate-900 no-animation">
          upvote
        </button>
        <button className="btn btn-ghost join-item bg-slate-900 text-slate-500 hover:text-white hover:bg-slate-900 no-animation">
          downvote
        </button>
        <button className="btn btn-ghost join-item bg-slate-900 text-slate-500 hover:text-white hover:bg-slate-900 no-animation">
          comment
        </button>
      </div>
    </div>
  );
}

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
  const { op, title, body, channel_id, upvotes, downvotes, created_at } = post;
  const { data } = await supabase.auth.getUser();

  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const relativeTime = (date: Date) => {
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    const now = new Date();
    const past = new Date(date);
    
    const difInMs = now.getTime() - past.getTime();
    
    const seconds = Math.floor(difInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
  
    if (years > 0) {
      return rtf.format(-years, "year");
    } else if (months > 0) {
      return rtf.format(-months, "month");
    } else if (days > 0) {
      return rtf.format(-days, "day");
    } else if (hours > 0) {
      return rtf.format(-hours, "hour");
    } else if (minutes > 0) {
      return rtf.format(-minutes, "minute");
    } else {
      return rtf.format(-seconds, "second");
    }
  }
  

  
  
  return (
    <div className="relative w-4/5 min-h-96 bg-slate-900 text-white rounded-box p-7 my-2 space-y-5">
      <h2 className="font-bold">r/{decodeURIComponent(channel_id)}</h2>
      <h1 className="text-lg">{title}</h1>
      <p className="text-neutral-400">{truncateText(body, 500)}</p>
      <p className=" absolute top-2 right-4 text-xs">
        Posted by {(op == data?.user?.id && "Me") || "anonymous"}
      </p>

      <p className="text-slate-300 absolute bottom-4 right-4 text-xs">
      {relativeTime(created_at)}
      </p>
      <UpvoteBar post={post} user={data?.user?.id || "anonymous"} />
    </div>
  );
}

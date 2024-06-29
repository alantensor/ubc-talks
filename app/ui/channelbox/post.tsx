export default function PostCard({ post }: { post: any }) {
  let postcolor = "blue";
  const { title, description, channel_id, op, upvote_count, createdAt } = post;

  async function handlePostClick() {
    console.log("Post clicked");
  }

  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };
  return (
    <div className="relative w-full min-w-96 min-h-96 bg-slate-900 rounded-box p-7 m-4 space-y-5">
      <h2>r/{channel_id}</h2>
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="text-slate-500 absolute top-2 right-4 text-xs">
        Posted by {op}
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

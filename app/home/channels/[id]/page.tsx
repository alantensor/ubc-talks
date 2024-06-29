// "use client";
import PostsWrapper from "@/app/ui/channelbox/posts-wrapper";
import Widgets from "@/app/ui/channelbox/widgets";
import { Suspense } from "react";
// import { usePathname } from "next/navigation";

export default async function Page() {
  // const pathname = usePathname();
  return (
    <>
      <div className="flex flex-col flex-1 py-5">
        <button className="btn btn-primary m-5 max-w-32">new post</button>
        {/* <p>{pathname}</p> */}
        <Suspense fallback={<p>Loading...</p>}>
          <PostsWrapper />
        </Suspense>
      </div>

      <div className="flex flex-col flex-1 py-5">
        <Widgets />
      </div>
    </>
  );
}

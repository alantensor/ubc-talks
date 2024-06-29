import PostsWrapper from "@/app/ui/channelbox/posts-wrapper";
import Widgets from "@/app/ui/channelbox/widgets";
import Link from "next/link";
import { Suspense } from "react";
// import { usePathname } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="flex flex-col py-5  w-2/3 h-auto">
        <button className="btn btn-primary m-5 max-w-32">
          <Link href={`./${params.id}/create`}>new post</Link>
        </button>
        {/* <p>{pathname}</p> */}
        <Suspense fallback={<p>Loading...</p>}>
          <PostsWrapper channel={params.id} />
        </Suspense>
      </div>

      <div className="flex flex-col sticky top-0 py-5 w-1/3 p-5 ">
        <Widgets />
      </div>
    </>
  );
}

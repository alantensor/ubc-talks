import { createClient } from "@/app/lib/supabase/server";
import PostsWrapper from "@/app/ui/channelbox/posts-wrapper";
import Widgets from "@/app/ui/channelbox/widgets";
import Link from "next/link";
import { Suspense } from "react";
// import { usePathname } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  // console.log(data.user);

  return (
    <div className="flex flex-col p-5 m-auto w-2/3 h-screen ">
      <Link
        href={`./${params.id}/create`}
        className={`btn btn-primary m-5 max-w-32`}
      >
        new post
      </Link>

      <div className="mx-auto w-full">
        {/* <p>{pathname}</p> */}
        <Suspense fallback={<p>Loading...</p>}>
          <PostsWrapper channel={params.id} user={data.user} />
        </Suspense>
      </div>

      {/* <div className="flex flex-col sticky top-0 py-5 w-1/3 p-5 ">
        <Widgets channel={params.id} />
      </div> */}
    </div>
  );
}

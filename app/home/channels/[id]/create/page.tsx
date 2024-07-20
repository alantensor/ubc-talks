import { createPost } from "@/app/lib/actions";
import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  // const { error } = await supabase
  // .from('countries')
  // .insert({ id: 1, name: 'Denmark' })
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user == null) {
    redirect(`/home/channels/${params.id}`);
  }

  const postWithChanneID = createPost.bind(null, params.id);

  return (
    <div className="flex flex-col rounded-3xl space-y-3 p-5 m-auto h-4/5 w-4/5 bg-slate-900">
      <h1 className="text-white">New Post</h1>
      <h1>Community: {params.id}</h1>
      <form action={postWithChanneID} className="h-full space-y-5 p-5">
        <input type="hidden" name="channel" value={params.id} />
       
        <input
          name="title"
          type="text"
          placeholder="Enter your title here"
          className="bg-slate-700 input text-white input-bordered font-bold w-full"
          maxLength={300}
          required={true}
        />
        <textarea
          name="body"
          className="bg-slate-700 text-white textarea textarea-bordered w-full h-2/3 resize-none"
          placeholder="Enter description"
        ></textarea>
        <button type="submit" className="btn btn-primary w-32">
          Post
        </button>

        <Link href={`/home/channels/${params.id}`}>
          <button className="btn btn-primary w-16 ml-5">Cancel</button>
        </Link>
      </form>
    </div>
  );
}

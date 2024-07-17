"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

// ***** CREATE ******
export async function createPost(id: string, formdata: FormData) {
  const supabase = createClient();
  const { title, body, channel } = Object.fromEntries(formdata);
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error.message);
    return;
  }

  const uid = data.user.id;

  if (uid) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            created_at: new Date(),
            op: uid.toString(),
            title: title.toString(),
            body: body.toString(),
            channel_id: channel.toString(),
          },
        ])
        .select();
    } catch (error) {
      console.log(error);
    }
  }
  revalidatePath(`/home/channels/${id}`);
  redirect(`/home/channels/${id}`);
}

// export async function updatePinned(channel: string) {
//   const supabase = createClient();
//   const { data, error } = await supabase.auth.getUser();

//   if (data.user == null) return;

// }

"use server";

import { revalidatePath, revalidateTag } from "next/cache";
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
            upvotes: [],
            downvotes: [],
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

// ***** UPDATE ******
export async function updatePinned(channel: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {

    console.log(error.message);
    return;
  }

  const uid = data.user.id;


  if (uid) {
    try {
      const { data, error } = await supabase
        .from("pinned_channels")
        .insert([
          {
            op: uid.toString(),
            channel_id: channel,
          },
        ])
        .select();

    } catch (error) {
      console.log(error);
    }
  }
  revalidatePath(`/`);
}

export async function updatePost(post: {
  id: number;
  created_at: Date;
  op: string;
  title: string;
  body: string;
  upvotes: string[]; // to avoid multiple from same user
  downvotes: string[];
  views: number;
  channel_id: string;
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .update({ upvotes: post.upvotes, downvotes: post.downvotes })
    .eq("op", post.op)
    .eq("id", post.id)
    .select();
}

// ****** READ ******

export async function getPosts(channel: string) {
  const supabase = createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select()
    .eq("channel_id", channel);
  return posts;
}


export async function getPinned() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log(error.message);
    return;
  }

  const uid = data.user.id;

  if (uid == null) return;

  let { data: pinned_channels } = await supabase
    .from("pinned_channels")
    .select("*")
    // .eq("op", uid.toString()); 

  console.log("t",pinned_channels);
  revalidatePath(`/`);
  return pinned_channels;
}

// ****** DELETE *******
export async function deletePinned(channel: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("pinned_channels")
    .delete()
    .eq("channel_id", channel);
}

//NOT USED

export async function getWidgetData(
  campus: string,
  yearsession: string,
  subject: string,
  course: string,
  section: string
) {
  let res = fetch(
    `https://ubcgrades.com/api/${campus}/${yearsession}/${subject}/${course}/${section}`
  );
  return res;
}

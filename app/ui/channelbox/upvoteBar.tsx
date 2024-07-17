"use client";

import { getPosts, updatePost } from "@/app/lib/actions";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function UpvoteBar({
  post,
  user,
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
  user: string;
}) {
  let prev = null;

  if (post.upvotes.includes(user)) {
    prev = "up";
  } else if (post.downvotes.includes(user)) {
    prev = "down";
  }

  const [prev_vote, setPrev] = useState<string | null>(prev);
  const [upvotes, setUpvotes] = useState<string[]>(post.upvotes);
  const [downvotes, setDownvotes] = useState<string[]>(post.downvotes);
  let ups = upvotes.length;
  let downs = downvotes.length;

  function handleClick(like: boolean) {
    console.log(prev_vote, ups, downs);
    if (prev_vote == null && like) {
      setPrev("up");
      setUpvotes([...upvotes, user]);
    } else if (prev_vote == null && !like) {
      setPrev("down");
      setDownvotes([...downvotes, user]);
    } else if (prev_vote == "up" && !like) {
      setPrev("down");
      setDownvotes([...downvotes, user]);
      setUpvotes(upvotes.filter((item) => item !== user));
    } else if (prev_vote == "down" && like) {
      setPrev("up");
      setDownvotes(downvotes.filter((item) => item !== user));
      setUpvotes([...upvotes, user]);
    }
    console.log("From handleClick:", upvotes, downvotes);
  }

  useEffect(() => {
    console.log("From useEffect:", upvotes, downvotes);
    if (prev_vote == null) return;

    const updateVotes = async () => {
      let newPost = { ...post };

      newPost.upvotes = upvotes;
      newPost.downvotes = downvotes;

      updatePost(newPost);
    };

    updateVotes();
  }, [prev_vote, ups, downs, post, user, upvotes, downvotes]);

  return (
    <>
      <div className="join absolute bottom-0 left-5 ">
        <div className="flex items-center">
          <p className="text-sm">{ups}</p>
          <button
            onClick={(e) => handleClick(true)}
            className={
              (prev_vote === "up" ? "text-white " : "") +
              `btn btn-ghost join-item bg-slate-900 text-slate-500 hover:text-gray-400 hover:bg-slate-900 no-animation`
            }
          >
            upvote
          </button>
        </div>
        <div className="flex items-center">
          <p className="text-sm">{downs}</p>
          <button
            onClick={(e) => handleClick(false)}
            className={
              (prev_vote === "down" ? "text-white " : "") +
              `btn btn-ghost join-item bg-slate-900 text-slate-500 hover:text-gray-400 hover:bg-slate-900 no-animation`
            }
          >
            downvote
          </button>
        </div>
        {/* <button className="btn btn-ghost join-item bg-slate-900 text-slate-500 hover:text-white hover:bg-slate-900 no-animation">
          comment
        </button> */}
      </div>
    </>
  );
}

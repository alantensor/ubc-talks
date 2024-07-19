import { createClient } from "@/app/lib/supabase/client";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import Image from "next/image";

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.startsWith("http") ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.endsWith("/") ? url : `${url}/`;
  return url;
};

export default function Header({
  user,
  setUser,
}: {
  user: User | null;
  setUser: (user: User | null) => void;
}) {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    // Immediately check if a user is signed in when the component mounts
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    checkUser();
  }, [setUser, supabase.auth]);

  const signIn = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: getURL(),
        },
      });
    } catch (error) {
      console.error("Error signing in", error);
    }
    router.push("/home");
  };

  const signOut = async () => {
    console.log(user);
    await supabase.auth.signOut();

    setUser(null); // Update state to reflect that user has signed out

    router.push("/");
  };

  if (user == null) {
    return (
      <div className="block space-y-5 space-x-3">
        <button className="btn btn-ghost btn-active" onClick={signIn}>
          Sign in
        </button>
      </div>
    );
  } else
    return (
      <div className="block space-y-5">
        <div className="flex">
          <div className="dropdown ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    user.user_metadata.avatar_url ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <button onClick={signOut}>Logout</button>
              </li>
            </ul>
          </div>
          <div className="m-auto ml-2">{user.user_metadata.full_name}</div>
        </div>
        {/* <button className="bg-orange-400 rounded-full py-1 px-3 text-slate-200">
        New Post
      </button> */}
      </div>
    );
}

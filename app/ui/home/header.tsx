"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  // const { data: session } = {
  //   data: {
  //     user: {
  //       name: "John Doe",
  //       image:
  //         "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
  //     },
  //   },
  // };

  if (session) {
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
                    session.user?.image ||
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
                <a>Settings</a>
              </li>
              <li>
                <button onClick={() => signOut()}>Logout</button>
              </li>
            </ul>
          </div>
          <div className="m-auto ml-2">{session.user?.name}</div>
        </div>
        {/* <button className="bg-orange-400 rounded-full py-1 px-3 text-slate-200">
        New Post
      </button> */}
      </div>
    );
  } else {
    return (
      <button className="btn btn-primary" onClick={() => signIn()}>
        Log in
      </button>
    );
  }
}

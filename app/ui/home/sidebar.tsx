"use client";
import SearchBar from "./searchbar";
import Header from "./header";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavLinks from "./nav-links";
import { createClient } from "@/app/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { deletePinned, getPinned } from "@/app/lib/actions";

const Sidebar = () => {
  const [filter, setFilter] = useState("");
  const supabase = createClient();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pinnedChannels, setPinnedChannels] = useState<any[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      let { data, error } = await supabase.auth.getUser();
      let pinned = await getPinned();
      // setCurrentUser(data?.user?.id);
      // console.log(data.user?.idz);
      if (data && pinned) {
        setPinnedChannels(pinned);
      }
      setCurrentUser(data.user);
    };

    // Call the async function

    fetchUser();
  }, [supabase.auth]);

  // console.log(pinnedChannels);
  return (
    <aside className="hidden sm:block bg-sky-800 overflow-y-scroll p-5">
      <Header user={currentUser} setUser={setCurrentUser} />

      <SearchBar onChange={(e) => setFilter(e.target.value)} />
      <ul className="menu bg-sky-800-200 w-56">
        {/* <li>
          <Link href={"/home"}>🏠&emsp;Home</Link>
        </li> */}
        <li>
          <details open>
            <summary>📌&emsp;Pinned</summary>
            <ul>
              {pinnedChannels.map(({ channel_id }, i) => {
                return (
                  <Link key={i} href={`/home/channels/${channel_id}`}>
                    <li key={i}>
                      <div className="flex justify-between">
                        {channel_id}
                        <button
                          onClick={(e) => {
                            // e.stopPropagation();
                            e.preventDefault();
                            e.stopPropagation();
                            deletePinned(channel_id);
                            setPinnedChannels(
                              pinnedChannels.filter(
                                (channel) => channel.channel_id !== channel_id
                              )
                            );
                          }}
                          className=" btn btn-xs btn-ghost btn-active hover:bg-white "
                        >
                          🗑️
                        </button>
                      </div>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary>📖&emsp;Courses</summary>
            <ul>
              <NavLinks
                filter={filter}
                user={currentUser}
                pinned={pinnedChannels}
                setPinned={setPinnedChannels}
              />
            </ul>
          </details>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

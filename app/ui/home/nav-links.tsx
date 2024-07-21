"use client";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import communities from "@/app/lib/communities";
import { User } from "@supabase/supabase-js";
import { updatePinned } from "@/app/lib/actions";
import toast, { Toaster } from "react-hot-toast";

const dummyIcon = UserGroupIcon;

// Map of links to display in the side navigation.

export default function NavLinks({
  filter,
  user,
  pinned,
  setPinned,
}: {
  filter: string;
  user: User | null;
  pinned: any[];
  setPinned: (value: any[]) => void;
}) {
  const addToPinned = (channel_id: string) => {
    updatePinned(channel_id);
    const isPinned = pinned.some((item) => item.channel_id === channel_id);
    if (!isPinned) {
      setPinned(pinned.concat({ channel_id: channel_id }));
      toast.success("Pinned!");
    } else toast.error("Already Pinned!");
  };

  // let comms = communities.filter((comm) =>
  //   pinned.some((item) => item.channel_id == comm)
  // );
  return (
    <>
      {communities
        .filter((comm) => comm.toLowerCase().includes(filter.toLowerCase()))
        .map((comm, i) => {
          const isPinned = pinned.some((item) => item.channel_id === comm);
          const CommProfilePic = dummyIcon;
          return (
            <Link key={i} href={`/home/channels/${comm}`}>
              <li key={i}>
                <span>
                  <CommProfilePic className="w-4 " />
                  {comm}
                  {user && !isPinned && (
                    <>
                      <button
                        onClick={(e) => addToPinned(comm)}
                        className=" btn btn-xs btn-ghost btn-active hover:bg-white m-0"
                      >
                        Pin
                      </button>
                      <Toaster
                        toastOptions={{
                          success: {
                            style: {
                              boxShadow: "none",
                            },
                          },
                          error: {
                            style: {
                              boxShadow: "none",
                            },
                          },
                        }}
                      />
                    </>
                  )}
                </span>
              </li>
            </Link>
          );
        })}
    </>
  );
}

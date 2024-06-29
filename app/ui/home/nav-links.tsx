"use client";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import communities from "@/app/lib/communities";
import { User } from "@supabase/supabase-js";

const dummyIcon = UserGroupIcon;

// Map of links to display in the side navigation.

export default function NavLinks({
  filter,
  user,
}: {
  filter: string;
  user: User | null;
}) {
  return (
    <>
      {communities
        .filter((comm) => comm.toLowerCase().includes(filter.toLowerCase()))
        .map((comm, i) => {
          const CommProfilePic = dummyIcon;
          return (
            <Link key={i} href={`/home/channels/${comm}`}>
              <li key={i}>
                <span>
                  <CommProfilePic className="w-4 " />
                  {comm}
                  {user && (
                    <button className=" btn btn-xs btn-ghost btn-active hover:bg-white m-0">
                      Pin
                    </button>
                  )}
                </span>
              </li>
            </Link>
          );
        })}
    </>
  );
}

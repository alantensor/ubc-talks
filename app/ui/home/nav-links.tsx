"use client";

import { UserGroupIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import communities from "@/app/lib/communities";
import { useSearchParams, usePathname } from "next/navigation";

const dummyIcon = UserGroupIcon;

// Map of links to display in the side navigation.

export default function NavLinks({ filter }: { filter: string }) {
  return (
    <>
      {communities
        .filter((comm) => comm.toLowerCase().includes(filter.toLowerCase()))
        .map((comm, i) => {
          const CommProfilePic = dummyIcon;
          return (
            <Link href={`/home/channels/${comm}`}>
              <li key={i}>
                <span>
                  <CommProfilePic className="w-4 " />
                  {comm}
                  <button className=" btn btn-xs btn-ghost btn-active hover:bg-white m-0">
                    Pin
                  </button>
                </span>
              </li>
            </Link>
          );
        })}
    </>
  );
}

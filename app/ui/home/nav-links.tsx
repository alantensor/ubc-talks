"use client";

import { UserGroupIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import communities from "@/app/lib/communities";

const dummyIcon = UserGroupIcon;

// Map of links to display in the side navigation.

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <ul>
      {communities.map((comm, i) => {
        const CommProfilePic = dummyIcon;
        return (
          <li>
            <span>
              <CommProfilePic className="w-4 " />
              <Link key={comm} href={"/home/channels/" + comm}>
                <p className="hidden md:block">{comm}</p>
              </Link>
              <button className=" btn btn-xs btn-ghost btn-active hover:bg-white m-0">
                Pin
              </button>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

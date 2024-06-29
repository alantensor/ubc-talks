"use client";

import { UserGroupIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import communities from "@/app/lib/communities";
import { useSearchParams, usePathname } from "next/navigation";

const dummyIcon = UserGroupIcon;

// Map of links to display in the side navigation.

export default function NavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  return (
    <ul>{query}
      {communities
        .filter((comm) => comm.toLowerCase().includes(query.toLowerCase()))
        .map((comm) => {
          const CommProfilePic = dummyIcon;
          const isActive = pathname === `/home/channels/${comm}`;

          return (
            <Link key={comm} href={"/home/channels/" + comm + "?query=" + query}>
              <li>
                <span
                  className={` ${isActive ? "bg-opacity-50 bg-gray-700" : ""}`}
                  style={{ transition: "background-color 0.3s" }}
                >
                  <CommProfilePic className="w-4 " />
                  <p className="hidden md:block">{comm}</p>

                  <button className=" btn btn-xs btn-ghost btn-active hover:bg-white m-0">
                    Pin
                  </button>
                  {/* on click add to db */}
                </span>
              </li>
            </Link>
          );
        })}
    </ul>
  );
}

import React, { use } from "react";
import Link from "next/link";
import NavLinks from "./nav-links";
import SearchBar from "./searchbar";
import Header from "./header";
import { Suspense } from "react";
import { useSession } from "next-auth/react";

const Sidebar = async () => {
  return (
    <aside className="hidden sm:block bg-sky-800 overflow-y-scroll p-5">
      <Header />
      <SearchBar />
      {/* <NavLinks /> */}
      <ul className="menu bg-sky-800-200 w-56">
        <li>
          <Link href={"/home"}>🏠&emsp;Home</Link>
        </li>
        <li>
          <details>
            <summary>📌&emsp;Pinned</summary>
          </details>
        </li>
        <li>
          <details open>
            <summary>📖&emsp;Courses</summary>
            <NavLinks />
          </details>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

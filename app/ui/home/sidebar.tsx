"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import NavLinks from "./nav-links";
import SearchBar from "./searchbar";
import Header from "./header";

const Sidebar = () => {
  const [filter, setFilter] = useState("");

  return (
    <aside className="hidden sm:block bg-sky-800 overflow-y-scroll p-5">
      <Header />
      <SearchBar onChange={(e) => setFilter(e.target.value)} />
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
            <ul>
              <NavLinks filter={filter} />
            </ul>
          </details>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

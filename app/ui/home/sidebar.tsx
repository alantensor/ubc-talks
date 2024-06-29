"use client";
import SearchBar from "./searchbar";
import Header from "./header";
import Link from "next/link";
import { useState } from "react";
import NavLinks from "./nav-links";
import { createClient } from "@/app/lib/supabase/client";
import { User } from "@supabase/supabase-js";

const Sidebar = () => {
  const [filter, setFilter] = useState("");
  const supabase = createClient();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <aside className="hidden sm:block bg-sky-800 overflow-y-scroll p-5">
      <Header user={currentUser} setUser={setCurrentUser} />

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
              <NavLinks filter={filter} user={currentUser} />
            </ul>
          </details>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

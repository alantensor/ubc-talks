import Sidebar from "../ui/home/sidebar";
import { Suspense } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex flex-row flex-1 bg-slate-700 overflow-y-auto pl-10">
          {children}
        </main>
      </div>
    </div>
  );
}

import React from "react";
import Header from "@/components/modules/Header";
import Sidebar from "../modules/SideBar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-4/5 block">
        <Header />
        <main className="min-h-screen max-w-[1280px] w-full mt-20 mx-auto px-12 pt-16">{children}</main>
      </div>
    </div>
  );
}

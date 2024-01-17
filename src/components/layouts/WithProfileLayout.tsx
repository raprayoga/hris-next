import React from "react";
import Header from "@/components/modules/Header";
import PersonalInfo from "../modules/PersonalInfo";

export default function WithProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mt-20 px-12">
        <div className="max-w-[1280px] mx-auto mt-32 pb-20">
          <PersonalInfo className="mb-10" />
          {children}
        </div>
      </main>
    </>
  );
}

import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import AccountProfile from "../modules/Account";

export default function Account() {
  return (
    <DefaultLayout>
      <div className="max-w-[1280px] mx-auto mt-32 pb-20">
        <AccountProfile />
      </div>
    </DefaultLayout>
  );
}

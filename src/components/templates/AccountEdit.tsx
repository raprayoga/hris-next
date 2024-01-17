import React from "react";
import AccountEditProfile from "../modules/AccountEdit";
import DefaultLayout from "../layouts/DefaultLayout";

export default function AccountEdit() {
  return (
    <DefaultLayout>
      <div className="max-w-[1280px] mx-auto mt-32 pb-20">
        <AccountEditProfile />
      </div>
    </DefaultLayout>
  );
}

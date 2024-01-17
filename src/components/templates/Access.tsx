
import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import Accesses from "../modules/Accesses/Accesses";

export default function Access() {
  return (
    <DefaultLayout>
      <div className="flex justify-between">
        <h2 className="font-semibold text-2xl">User Access List</h2>
      </div>
      <Accesses className="mb-20 mt-5" />
    </DefaultLayout>
  );
}

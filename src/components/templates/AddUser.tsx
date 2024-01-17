import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { AddUserForm } from "../modules/Users/AddUserForm";

export default function AddUser() {
  return (
    <DefaultLayout>
      <AddUserForm className="mb-20 mt-5" />
    </DefaultLayout>
  );
}

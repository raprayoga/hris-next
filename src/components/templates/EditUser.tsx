import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { EditUserForm } from "../modules/Users/EditUserForm";

export default function EditUser() {
  return (
    <DefaultLayout>
      <EditUserForm className="mb-20 mt-5" />
    </DefaultLayout>
  );
}

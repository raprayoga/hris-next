import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { AddPermissionForm } from "../modules/Permissions/AddPermissionForm";

export default function AddPermission() {
  return (
    <DefaultLayout>
      <AddPermissionForm className="mb-20 mt-5" />
    </DefaultLayout>
  );
}

import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { EditPermissionForm } from "../modules/Permissions/EditPermissionForm";

export default function EditPermission() {
  return (
    <DefaultLayout>
      <EditPermissionForm className="mb-20 mt-5" />
    </DefaultLayout>
  );
}

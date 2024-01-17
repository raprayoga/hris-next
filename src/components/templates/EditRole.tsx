import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { EditRoleForm } from "../modules/Roles/EditRoleForm";

export default function EditRole() {
  return (
    <DefaultLayout>
      <EditRoleForm className="mb-20 mt-5" />
    </DefaultLayout>
  );
}

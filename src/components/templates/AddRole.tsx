import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { AddRoleForm } from "../modules/Roles/AddRoleForm";

export default function AddRole() {
  return (
    <DefaultLayout>
      <AddRoleForm className="mb-20 mt-5" />
    </DefaultLayout>
  );
}

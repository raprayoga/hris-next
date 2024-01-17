import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { EditAccessesForm } from "../modules/Accesses/EditAccessesForm";

export default function EditAccesses() {
  return (
    <DefaultLayout>
      <EditAccessesForm className="mb-20 mt-5" />
    </DefaultLayout>
  );
}

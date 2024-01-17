import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { EditDivisiForm } from "../modules/Divisis/EditDivisiForm";

export default function EditDivisi() {
  return (
    <DefaultLayout>
      <EditDivisiForm className="mb-20 mt-5" />
    </DefaultLayout>
  );
}

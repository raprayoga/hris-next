import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { AddDivisiForm } from "../modules/Divisis/AddDivisiForm";

export default function AddDivisi() {
  return (
    <DefaultLayout>
      <AddDivisiForm className="mb-20 mt-5" />
    </DefaultLayout>
  );
}

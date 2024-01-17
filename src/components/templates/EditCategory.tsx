import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { EditCategoryForm } from "../modules/Categories/EditCategoryForm";

export default function EditCategory() {
  return (
    <DefaultLayout>
      <EditCategoryForm className="mb-20 mt-5" />
    </DefaultLayout>
  );
}

import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { AddCategoryForm } from "../modules/Categories/AddCategoryForm";

export default function AddCategory() {
  return (
    <DefaultLayout>
      <AddCategoryForm className="mb-20 mt-5" />
    </DefaultLayout>
  );
}

import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import Link from "next/link";
import Button from "../elements/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import Categories from "../modules/Categories/Categories";

export default function Category() {
  return (
    <DefaultLayout>
      <div className="flex justify-between">
        <h2 className="font-semibold text-2xl">Job Category</h2>
        <Link href="/job-category/add" className="flex">
          <Button theme="green" variant="ghost" className="px-3 py-1 w-32 flex justify-between">
            <PlusIcon className="w-4" />
            Add Category
          </Button>
        </Link>
      </div>
      <Categories className="mb-20 mt-5" />
    </DefaultLayout>
  );
}

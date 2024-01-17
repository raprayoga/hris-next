
import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import Link from "next/link";
import Button from "../elements/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import Roles from "../modules/Roles/Roles";

export default function Role() {
  return (
    <DefaultLayout>
      <div className="flex justify-between">
        <h2 className="font-semibold text-2xl">Roles</h2>
        <Link href="/role/add" className="flex">
          <Button theme="green" variant="ghost" className="px-3 py-1 w-32 flex justify-between">
            <PlusIcon className="w-4" />
            Add Roles
          </Button>
        </Link>
      </div>
      <Roles className="mb-20 mt-5" />
    </DefaultLayout>
  );
}

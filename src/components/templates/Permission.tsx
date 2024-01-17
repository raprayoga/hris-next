
import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import Link from "next/link";
import Button from "../elements/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import Permissions from "../modules/Permissions/Permissions";

export default function Permission() {
  return (
    <DefaultLayout>
      <div className="flex justify-between">
        <h2 className="font-semibold text-2xl">Permissions</h2>
        <Link href="/permission/add" className="flex">
          <Button theme="green" variant="ghost" className="px-3 py-1 w-40 flex justify-between">
            <PlusIcon className="w-4" />
            Add Permissions
          </Button>
        </Link>
      </div>
      <Permissions className="mb-20 mt-5" />
    </DefaultLayout>
  );
}

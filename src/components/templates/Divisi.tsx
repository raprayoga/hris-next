import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import Divisis from "../modules/Divisis/Divisis";
import Link from "next/link";
import Button from "../elements/Button";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function Divisi() {
  return (
    <DefaultLayout>
      <div className="flex justify-between">
        <h2 className="font-semibold text-2xl">Job Divisi</h2>
        <Link href="/job-divisi/add" className="flex">
          <Button theme="green" variant="ghost" className="px-3 py-1 w-32 flex justify-between">
            <PlusIcon className="w-4" />
            Add Divisi
          </Button>
        </Link>
      </div>
      <Divisis className="mb-20 mt-5" />
    </DefaultLayout>
  );
}

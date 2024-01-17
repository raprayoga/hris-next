import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import Users from "../modules/Users/Users";
import Link from "next/link";
import Button from "../elements/Button";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <DefaultLayout>
      <div className="flex justify-between">
        <h2 className="font-semibold text-2xl">User List</h2>
        <Link href="/user/add" className="flex">
          <Button theme="green" variant="ghost" className="px-3 py-1 w-32 flex justify-between">
            <PlusIcon className="w-4" />
            Add User
          </Button>
        </Link>
      </div>
      <Users className="mb-20 mt-5" />
    </DefaultLayout>
  );
}

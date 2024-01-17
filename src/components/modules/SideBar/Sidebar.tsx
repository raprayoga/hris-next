import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  UsersIcon,
  UserIcon,
  RectangleStackIcon,
  TagIcon,
  QrCodeIcon,
  ArrowLeftIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  const router = useRouter();

  return (
    <aside
      className="min-h-screen w-1/5 min-w-[150px] bg-primary px-2.5 py-5"
      {...props}
      ref={ref}
    >
      <h2 className="mx-2.5 my-5 text-2xl font-bold text-white">
        <span className="block text-sm">Management</span>
        User
      </h2>
      <ul>
        <li
          className={`mx-2.5 my-2 ${
            router.pathname.includes("/user") ? "text-white" : "text-gray"
          }`}
        >
          <Link href="/user" className="flex">
            <UsersIcon className="mr-2 w-4" />
            Users
          </Link>
        </li>
        <li
          className={`mx-2.5 my-2 ${
            router.pathname.includes("/job-divisi") ? "text-white" : "text-gray"
          }`}
        >
          <Link href="/job-divisi" className="flex">
            <RectangleStackIcon className="mr-2 w-4" />
            Job Divisi
          </Link>
        </li>
        <li
          className={`mx-2.5 my-2 ${
            router.pathname.includes("/job-category") ? "text-white" : "text-gray"
          }`}
        >
          <Link href="/job-category" className="flex">
            <TagIcon className="mr-2 w-4" />
            Job Category
          </Link>
        </li>
        <li
          className={`mx-2.5 my-2 ${
            router.pathname.includes("/permission") ? "text-white" : "text-gray"
          }`}
        >
          <Link href="/permission" className="flex">
            <QrCodeIcon className="mr-2 w-4" />
            Permission
          </Link>
        </li>
        <li
          className={`mx-2.5 my-2 ${
            router.pathname.includes("/role") ? "text-white" : "text-gray"
          }`}
        >
          <Link href="/role" className="flex">
            <ArrowLeftIcon className="mr-2 w-4" />
            Role
          </Link>
        </li>
        <li
          className={`mx-2.5 my-2 ${
            router.pathname.includes("/user-access") ? "text-white" : "text-gray"
          }`}
        >
          <Link href="/user-access" className="flex">
            <ExclamationTriangleIcon className="mr-2 w-4" />
            User Role Management
          </Link>
        </li>
      </ul>
    </aside>
  );
});
Sidebar.displayName = "Sidebar";

export { Sidebar };

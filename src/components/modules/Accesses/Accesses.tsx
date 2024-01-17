import React, { useState, useEffect } from "react";
import Button from "@/components/elements/Button";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "@/store/toast";
import { cn } from "@/utils";
import { useRouter } from "next/router";
import { getAccess } from "@/services/accessService";
import { Access } from "@/interface/access";
import useHandleError from "@/utils/handleError";

export default function Accesses({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const dispatch: Dispatch<any> = useDispatch();
  const [users, setUsers] = useState<Access[]>([]);
  const { setError } = useHandleError()

  useEffect(() => {
    getAccessList();
  }, []);

  const getAccessList = async () => {
    try {
      const response = await getAccess();
      setUsers(response.users);
    } catch (error: any) {
      dispatch(
        showToast({
          message: error?.response?.data?.message ?? "Failed to get user access list",
          type: "danger",
        })
      );
      setError(error)
    }
  };

  return (
    <div {...props} className={cn("relative overflow-x-auto", className)}>
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-shadow text-xs">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr className="text-center">
              <td colSpan={4}>User Not Found</td>
            </tr>
          )}
          {users.length > 0 &&
            users.map((user) => (
              <tr className="border-b bg-white" key={user.id}>
                <td scope="row" className="whitespace-nowrap px-6 py-4">
                  {user.id}
                </td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">
                  {user.roles.map(role => (
                    role.name
                  ))}
                </td>
                <td className="px-6 py-4 flex gap-1">
                  <Link href={`/user-access/${user.id}`} className="flex">
                    <Button
                      theme="yellow"
                      variant="ghost"
                      className="px-3 py-1"
                    >
                      Edit
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

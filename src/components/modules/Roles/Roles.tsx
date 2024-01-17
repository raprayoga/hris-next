import React, { useState, useEffect } from "react";
import Button from "@/components/elements/Button";
import Dialog from "@/components/elements/Dialog";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "@/store/toast";
import { cn } from "@/utils";
import { useRouter } from "next/router";
import { deleteRole, getRole } from "@/services/roleService";
import { Role } from "@/interface/role";
import useHandleError from "@/utils/handleError";

export default function Roles({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const dispatch: Dispatch<any> = useDispatch();
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<number>(0);
  const [roles, setRoles] = useState<Role[]>([]);
  const { setError } = useHandleError();

  useEffect(() => {
    getRoleList();
  }, []);

  const getRoleList = async () => {
    try {
      const response = await getRole();
      setRoles(response.roles);
    } catch (error: any) {
      dispatch(
        showToast({
          message: error?.response?.data?.message ?? "Failed to get roles list",
          type: "danger",
        })
      );
      setError(error);
    }
  };

  const handleConfirmDelete = (id: number) => {
    setIdDelete(id);
    toggleShowDialog(true);
  };

  const toggleShowDialog = (value: boolean) => {
    setIsShowDialog(value);
  };

  const handleDeleteItem = async () => {
    try {
      await deleteRole(idDelete);
      dispatch(
        showToast({
          message: "Success to delete roles",
          type: "green",
        })
      );
      setIsShowDialog(false);
      getRoleList();
    } catch (error: any) {
      dispatch(
        showToast({
          message: error?.response?.data?.message ?? "Failed to delete roles",
          type: "danger",
        })
      );
      setError(error);
    }
  };

  return (
    <>
      <div {...props} className={cn("relative overflow-x-auto", className)}>
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-shadow text-xs">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Permission
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {roles.length === 0 && (
              <tr className="text-center">
                <td colSpan={4}>Role Not Found</td>
              </tr>
            )}
            {roles.length > 0 &&
              roles.map((role) => (
                <tr className="border-b bg-white" key={role.id}>
                  <td scope="row" className="whitespace-nowrap px-6 py-4">
                    {role.id}
                  </td>
                  <td className="px-6 py-4">{role.name}</td>
                  <td className="px-6 py-4">
                    {role.permissions.map(
                      (permission) => permission.name + ", "
                    )}
                  </td>
                  <td className="px-6 py-4 flex gap-1 justify-center">
                    <Link href={`/role/${role.id}`} className="flex">
                      <Button
                        theme="yellow"
                        variant="ghost"
                        className="px-3 py-1"
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      theme="primary"
                      variant="ghost"
                      className="px-3 py-1"
                      onClick={() => handleConfirmDelete(role.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Dialog
        isShow={isShowDialog}
        className="flex w-[280px] flex-col items-center"
        onClose={() => toggleShowDialog(false)}
      >
        <div className="mb-5 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-red">
          <ExclamationCircleIcon className="w-[30px] stroke-2 text-white" />
        </div>
        <p className="text-sm">Be sure to delete this role ?</p>
        <p
          className="my-6 cursor-pointer text-sm font-bold text-primary"
          onClick={() => handleDeleteItem()}
        >
          Ya, Lanjutkan
        </p>
        <Button
          className="cursor-pointer text-sm font-bold"
          theme="primary"
          variant="ghost"
          onClick={() => toggleShowDialog(false)}
        >
          Batalkan
        </Button>
      </Dialog>
    </>
  );
}

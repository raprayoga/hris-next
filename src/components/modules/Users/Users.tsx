import React, { useState, useEffect } from "react";
import Button from "@/components/elements/Button";
import Dialog from "@/components/elements/Dialog";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "@/store/toast";
import { cn } from "@/utils";
import { deleteUser, getUsers } from "@/services/usersService";
import { User } from "@/interface/user";
import { Divisi } from "@/interface/divisi";
import { Category } from "@/interface/category";
import { getCategory } from "@/services/categoryService";
import { getDivisi } from "@/services/divisiService";
import useHandleError from "@/utils/handleError";

export default function Users({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const dispatch: Dispatch<any> = useDispatch();
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [divisis, setDivisis] = useState<Divisi[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { setError } = useHandleError()

  useEffect(() => {
    getUserList();
    getDivisiList();
    getCategoryList();
  }, []);

  const getUserList = async () => {
    try {
      const response = await getUsers();
      setUsers(response.users);
    } catch (error: any) {
      dispatch(
        showToast({
          message: error?.response?.data?.message ?? "Failed to get user list",
          type: "danger",
        })
      );
      setError(error)
    }
  };

  const getDivisiList = async () => {
    try {
      const response = await getDivisi();
      setDivisis(response.job_divisi);
    } catch (error: any) {
      setDivisis([]);
    }
  };

  const getCategoryList = async () => {
    try {
      const response = await getCategory();
      setCategories(response.job_category);
    } catch (error: any) {
      setCategories([]);
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
      await deleteUser(idDelete);
      dispatch(
        showToast({
          message: "Success to delete user",
          type: "green",
        })
      );
      setIsShowDialog(false)
      getUserList()
    } catch (error: any) {
      dispatch(
        showToast({
          message: error?.response?.data?.message ?? "Failed to delete user",
          type: "danger",
        })
      );
      setError(error)
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
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Divisi
              </th>
              <th scope="col" className="px-6 py-3">
                Category
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
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    {divisis.find(divisi => divisi.id === user.job_divisi_id)?.job_divisi ?? ''}
                  </td>
                  <td className="px-6 py-4">
                    {categories.find(category => category.id === user.job_category_id)?.job_category ?? ''}
                  </td>
                  <td className="px-6 py-4 flex gap-1">
                    <Link href={`/user/${user.id}`} className="flex">
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
                      onClick={() => handleConfirmDelete(user.id)}
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
        <p className="text-sm">Be sure to delete this menu user ?</p>
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

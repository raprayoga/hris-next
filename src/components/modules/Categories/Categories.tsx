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
import { deleteCategory, getCategory } from "@/services/categoryService";
import { Category } from "@/interface/category";
import useHandleError from "@/utils/handleError";

export default function Categories({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const dispatch: Dispatch<any> = useDispatch();
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const { setError } = useHandleError();

  useEffect(() => {
    getCatgoryList();
  }, []);

  const getCatgoryList = async () => {
    try {
      const response = await getCategory();
      setCategories(response.job_category);
    } catch (error: any) {
      dispatch(
        showToast({
          message:
            error?.response?.data?.message ?? "Failed to get category list",
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
      await deleteCategory(idDelete);
      dispatch(
        showToast({
          message: "Success to delete category",
          type: "green",
        })
      );
      setIsShowDialog(false);
      getCatgoryList();
    } catch (error: any) {
      dispatch(
        showToast({
          message:
            error?.response?.data?.message ?? "Failed to delete category",
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
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 && (
              <tr className="text-center">
                <td colSpan={4}>Job Category Not Found</td>
              </tr>
            )}
            {categories.length > 0 &&
              categories.map((category) => (
                <tr className="border-b bg-white" key={category.id}>
                  <td scope="row" className="whitespace-nowrap px-6 py-4">
                    {category.id}
                  </td>
                  <td className="px-6 py-4">{category.job_category}</td>
                  <td className="px-6 py-4 flex gap-1 justify-center">
                    <Link
                      href={`/job-category/${category.id}`}
                      className="flex"
                    >
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
                      onClick={() => handleConfirmDelete(category.id)}
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
        <p className="text-sm">Be sure to delete this category ?</p>
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

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
import { deleteDivisi, getDivisi } from "@/services/divisiService";
import { Divisi } from "@/interface/divisi";
import useHandleError from "@/utils/handleError";

export default function Divisis({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const dispatch: Dispatch<any> = useDispatch();
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<number>(0);
  const [divisis, setDivisis] = useState<Divisi[]>([]);
  const { setError } = useHandleError()

  useEffect(() => {
    getDivisiList();
  }, []);

  const getDivisiList = async () => {
    try {
      const response = await getDivisi();
      setDivisis(response.job_divisi);
    } catch (error: any) {
      dispatch(
        showToast({
          message: error?.response?.data?.message ?? "Failed to get divisi list",
          type: "danger",
        })
      );
      setError(error)

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
      await deleteDivisi(idDelete);
      dispatch(
        showToast({
          message: "Success to delete divisi",
          type: "green",
        })
      );
      setIsShowDialog(false)
      getDivisiList()
    } catch (error: any) {
      dispatch(
        showToast({
          message: error?.response?.data?.message ?? "Failed to delete divisi",
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
                Divisi
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {divisis.length === 0 && (
              <tr className="text-center">
                <td colSpan={4}>Job Divisi Not Found</td>
              </tr>
            )}
            {divisis.length > 0 &&
              divisis.map((divisi) => (
                <tr className="border-b bg-white" key={divisi.id}>
                  <td scope="row" className="whitespace-nowrap px-6 py-4">
                    {divisi.id}
                  </td>
                  <td className="px-6 py-4">{divisi.job_divisi}</td>
                  <td className="px-6 py-4 flex gap-1 justify-center">
                    <Link href={`/job-divisi/${divisi.id}`} className="flex">
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
                      onClick={() => handleConfirmDelete(divisi.id)}
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
        <p className="text-sm">Be sure to delete this divisi ?</p>
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

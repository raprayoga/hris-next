import React, { useState } from "react";
import { cn } from "@/utils";
import { Input, InputGroup } from "@/components/elements/InputGroup";
import {
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/elements/Button";
import { useDispatch } from "react-redux";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "@/store/toast";
import { useRouter } from "next/router";
import { formRules, getVariant } from "@/utils/form-rules";
import { addPermission } from "@/services/permissionService";
import { EditPermission } from "@/interface/permission";
import useHandleError from "@/utils/handleError";

export function AddPermissionForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const dispatch: Dispatch<any> = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { setError } = useHandleError()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPermission>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<EditPermission> = async (data) => {
    setIsLoading(true);
    try {
      await addPermission(data);
      dispatch(
        showToast({
          message: "Success to add new permission",
          type: "green",
        })
      );
      setIsLoading(false);
      router.push("/permission");
    } catch (error: any) {
      dispatch(
        showToast({
          message: error?.response?.data?.message ?? "Failed to add new permission",
          type: "danger",
        })
      );
      setError(error)
    }
    setIsLoading(false);
  };

  return (
    <div {...props} className={cn("text-center", className)}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[700px] mx-auto">
        <Controller
          control={control}
          rules={{ required: formRules.required }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { isDirty, error },
          }) => (
            <>
              <InputGroup className="w-full">
                <QrCodeIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                <Input
                  type="name"
                  placeholder="insert permission"
                  className="pl-6"
                  theme={getVariant(isDirty, !!error)}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              </InputGroup>
              <span className="text-[10px] text-primary float-right">
                {errors.permission ? errors.permission.message : ""}
              </span>
            </>
          )}
          name="permission"
        />

        <Button
          type="submit"
          theme="primary"
          className="w-full mt-8"
          isLoading={isLoading}
        >
          Add Permission
        </Button>
      </form>
    </div>
  );
}

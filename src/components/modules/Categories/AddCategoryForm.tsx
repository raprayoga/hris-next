import React, { useState } from "react";
import { cn } from "@/utils";
import { Input, InputGroup } from "@/components/elements/InputGroup";
import {
   TagIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/elements/Button";
import { useDispatch } from "react-redux";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "@/store/toast";
import { useRouter } from "next/router";
import { formRules, getVariant } from "@/utils/form-rules";
import { addCategory } from "@/services/categoryService";
import { EditCategory } from "@/interface/category";
import useHandleError from "@/utils/handleError";

export function AddCategoryForm({
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
  } = useForm<EditCategory>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<EditCategory> = async (data) => {
    setIsLoading(true);
    try {
      await addCategory(data);
      dispatch(
        showToast({
          message: "Success to add new category",
          type: "green",
        })
      );
      setIsLoading(false);
      router.push("/job-category");
    } catch (error: any) {
      dispatch(
        showToast({
          message: error?.response?.data?.message ?? "Failed to add new category",
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
                <TagIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                <Input
                  type="name"
                  placeholder="insert job category"
                  className="pl-6"
                  theme={getVariant(isDirty, !!error)}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              </InputGroup>
              <span className="text-[10px] text-primary float-right">
                {errors.job_category ? errors.job_category.message : ""}
              </span>
            </>
          )}
          name="job_category"
        />

        <Button
          type="submit"
          theme="primary"
          className="w-full mt-8"
          isLoading={isLoading}
        >
          Add Category
        </Button>
      </form>
    </div>
  );
}

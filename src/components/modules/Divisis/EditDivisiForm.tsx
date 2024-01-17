import React, { useEffect, useState } from "react";
import { cn } from "@/utils";
import { Input, InputGroup } from "@/components/elements/InputGroup";
import { RectangleStackIcon } from "@heroicons/react/24/outline";
import Button from "@/components/elements/Button";
import { useDispatch } from "react-redux";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "@/store/toast";
import { useRouter } from "next/router";
import { formRules, getVariant } from "@/utils/form-rules";
import { Divisi, EditDivisi } from "@/interface/divisi";
import { editDivisi, updateDivisi } from "@/services/divisiService";
import useHandleError from "@/utils/handleError";

export function EditDivisiForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const dispatch: Dispatch<any> = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [divisi, setDivisi] = useState<Partial<Divisi>>({});
  const iddivisi: string = router.query.id as string;
  const { setError } = useHandleError();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditDivisi>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<EditDivisi> = async (data) => {
    setIsLoading(true);
    try {
      await updateDivisi(+iddivisi, data);
      dispatch(
        showToast({
          message: "Success to add new divisi",
          type: "green",
        })
      );
      setIsLoading(false);
      router.push("/job-divisi");
    } catch (error: any) {
      dispatch(
        showToast({
          message: error?.response?.data?.message ?? "Failed to add new divisi",
          type: "danger",
        })
      );
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getEditDivisi();
  }, []);

  const getEditDivisi = async () => {
    try {
      const divisi = await editDivisi(+iddivisi);
      setDivisi(divisi.job_divisi);
    } catch (error: any) {
      dispatch(
        showToast({
          message: error?.response?.data?.message ?? "Divisi not valid",
          type: "danger",
        })
      );
      setError(error);

      router.push("/job-divisi");
    }
  };

  return (
    <div {...props} className={cn("text-center", className)}>
      {divisi && divisi.id === +iddivisi && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[700px] mx-auto"
        >
          <Controller
            control={control}
            rules={{ required: formRules.required }}
            defaultValue={divisi.job_divisi}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { isDirty, error },
            }) => (
              <>
                <InputGroup className="w-full">
                  <RectangleStackIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                  <Input
                    type="name"
                    placeholder="insert job divisi"
                    className="pl-6"
                    theme={getVariant(isDirty, !!error)}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
                <span className="text-[10px] text-primary float-right">
                  {errors.job_divisi ? errors.job_divisi.message : ""}
                </span>
              </>
            )}
            name="job_divisi"
          />

          <Button
            type="submit"
            theme="primary"
            className="w-full mt-8"
            isLoading={isLoading}
          >
            Add Divisi
          </Button>
        </form>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { cn } from "@/utils";
import { Input, InputGroup, Select } from "@/components/elements/InputGroup";
import {
  AtSymbolIcon,
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/elements/Button";
import { useDispatch } from "react-redux";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "@/store/toast";
import { useRouter } from "next/router";
import { formRules, getVariant } from "@/utils/form-rules";
import { addUser } from "@/services/usersService";
import { AddUser } from "@/interface/user";
import { getDivisi } from "@/services/divisiService";
import { Divisi } from "@/interface/divisi";
import { Category } from "@/interface/category";
import { getCategory } from "@/services/categoryService";
import useHandleError from "@/utils/handleError";

export function AddUserForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const dispatch: Dispatch<any> = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [divisis, setDivisis] = useState<Divisi[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { setError } = useHandleError()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUser>({
    mode: "onChange",
  });
  
  useEffect(() => {
    getDivisiList();
    getCategoryList();
  }, []);

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

  const onSubmit: SubmitHandler<AddUser> = async (data) => {
    setIsLoading(true);
    try {
      await addUser(data);
      dispatch(
        showToast({
          message: "Success to add new user",
          type: "green",
        })
      );
      setIsLoading(false);
      router.push("/");
    } catch (error: any) {
      dispatch(
        showToast({
          message: error?.response?.data?.message ?? "Failed to add new user",
          type: "danger",
        })
      );
      setError(error)
    }
    setIsLoading(false);
  };

  const handleToggleShowPass = () => {
    setIsShowPass((prevState) => {
      return !prevState;
    });
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
                <UserIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                <Input
                  type="name"
                  placeholder="insert name"
                  className="pl-6"
                  theme={getVariant(isDirty, !!error)}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              </InputGroup>
              <span className="text-[10px] text-primary float-right">
                {errors.name ? errors.name.message : ""}
              </span>
            </>
          )}
          name="name"
        />

        <Controller
          control={control}
          rules={{ required: formRules.required, pattern: formRules.email }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { isDirty, error },
          }) => (
            <>
              <InputGroup className="w-full mt-8">
                <AtSymbolIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                <Input
                  type="email"
                  placeholder="insert email"
                  className="pl-6"
                  theme={getVariant(isDirty, !!error)}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              </InputGroup>
              <span className="text-[10px] text-primary float-right">
                {errors.email ? errors.email.message : ""}
              </span>
            </>
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{ required: formRules.required }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { isDirty, error },
          }) => (
            <>
              <InputGroup className="w-full mt-8">
                <KeyIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                <Input
                  name="last_name"
                  type={isShowPass ? "text" : "password"}
                  placeholder="insert password"
                  className="px-6"
                  theme={getVariant(isDirty, !!error)}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
                <div
                  onClick={handleToggleShowPass}
                  className="absolute right-2 left-auto cursor-pointer"
                >
                  {!isShowPass && (
                    <EyeIcon className="w-3 stroke-2 text-gray" />
                  )}
                  {isShowPass && (
                    <EyeSlashIcon className="w-3 stroke-2 text-gray" />
                  )}
                </div>
              </InputGroup>

              <span className="text-[10px] text-primary float-right">
                {errors.password ? errors.password.message : ""}
              </span>
            </>
          )}
          name="password"
        />
        
        <Controller
            control={control}
            rules={{ required: formRules.required }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { isDirty, error },
            }) => (
              <>
                <InputGroup className="w-full mt-8">
                  <AtSymbolIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                  <Select
                    className="pl-6"
                    theme={getVariant(isDirty, !!error)}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  >
                    <option value="">select roles</option>
                    {divisis.map((divisi) => (
                      <option
                        value={divisi.id}
                        key={divisi.id}
                      >
                        {divisi.job_divisi}
                      </option>
                    ))}
                  </Select>
                </InputGroup>
                <span className="text-[10px] text-primary float-right">
                  {errors.job_divisi_id ? errors.job_divisi_id.message : ""}
                </span>
              </>
            )}
            name="job_divisi_id"
          />
          
          <Controller
            control={control}
            rules={{ required: formRules.required }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { isDirty, error },
            }) => (
              <>
                <InputGroup className="w-full mt-8">
                  <AtSymbolIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                  <Select
                    className="pl-6"
                    theme={getVariant(isDirty, !!error)}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  >
                    <option value="">select roles</option>
                    {categories.map((category) => (
                      <option
                        value={category.id}
                        key={category.id}
                      >
                        {category.job_category}
                      </option>
                    ))}
                  </Select>
                </InputGroup>
                <span className="text-[10px] text-primary float-right">
                  {errors.job_category_id ? errors.job_category_id.message : ""}
                </span>
              </>
            )}
            name="job_category_id"
          />

        <Button
          type="submit"
          theme="primary"
          className="w-full mt-8"
          isLoading={isLoading}
        >
          Add User
        </Button>
      </form>
    </div>
  );
}

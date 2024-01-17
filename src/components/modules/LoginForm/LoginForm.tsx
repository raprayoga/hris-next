import React, { useState, useEffect } from "react";
import { cn } from "@/utils";
import { Input, InputGroup } from "@/components/elements/InputGroup";
import {
  AtSymbolIcon,
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/elements/Button";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { loginAsync } from "@/store/auth";
import { sliceState } from "@/interface/state";
import { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "@/store/toast";
import { useRouter } from "next/router";
import { formRules, getVariant } from "@/utils/form-rules";
import { LoginInputsForm } from "@/interface/auth";

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const dispatch: Dispatch<any> = useDispatch();
  const auth = useSelector((state: sliceState) => state.auth);
  const [isShowPass, setIsShowPass] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputsForm>({
    mode: "onChange",
  });

  useEffect(() => {
    if (auth.error) {
      dispatch(
        showToast({
          message: "Email or Password does not match",
          type: "danger",
        })
      );
    }

    if (auth.isLogin) {
      dispatch(
        showToast({
          message: "Success to login",
          type: "green",
        })
      );

      router.push("/");
    }
  }, [dispatch, auth.error, auth.isLogin, router]);

  const onSubmit: SubmitHandler<LoginInputsForm> = (data) => {
    dispatch(loginAsync(data));
  };

  const handleToggleShowPass = () => {
    setIsShowPass((prevState) => {
      return !prevState;
    });
  };

  useEffect(() => {
    if (auth.isLogin) router.push("/");
  }, [auth.isLogin, router]);

  return (
    <div {...props} className={cn("text-center", className)}>
      <div className="flex items-center justify-center">
        <Image
          src={logo}
          alt="logo"
          width={25}
          height={25}
          className="w-[25px] h-[25px]"
        />
        <h2 className="ml-1 text-xl text-center font-semibold">
          USER MANAGEMENT APP
        </h2>
      </div>

      <div className="flex justify-center">
        <h3 className="w-4/5 text-3xl my-10 font-semibold">
          Lengkapi data untuk membuat akun
        </h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          rules={{ required: formRules.required, pattern: formRules.email }}
          defaultValue="firstuser@gmail.com"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { isDirty, error },
          }) => (
            <>
              <InputGroup className="w-full">
                <AtSymbolIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                <Input
                  type="email"
                  placeholder="masukan email anda"
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
          defaultValue="password"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { isDirty, error },
          }) => (
            <>
              <InputGroup className="w-full mt-8">
                <UserIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                <Input
                  name="last_name"
                  type={isShowPass ? "text" : "password"}
                  placeholder="masukan password anda"
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

        <Button
          type="submit"
          theme="primary"
          className="w-full mt-8"
          isLoading={auth.loading}
        >
          Login
        </Button>
      </form>

      <div className="mt-5">
        <span className="text-xs ">
          belum punya akun? registrasi{" "}
          <Link href="/register" className="text-primary font-bold">
            di sini
          </Link>
        </span>
      </div>
    </div>
  );
}

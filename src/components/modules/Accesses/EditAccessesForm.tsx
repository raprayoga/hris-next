import React, { useEffect, useState } from "react";
import { cn } from "@/utils";
import { Input, InputGroup, Select } from "@/components/elements/InputGroup";
import { AtSymbolIcon, UserIcon } from "@heroicons/react/24/outline";
import Button from "@/components/elements/Button";
import { useDispatch } from "react-redux";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "@/store/toast";
import { useRouter } from "next/router";
import { formRules, getVariant } from "@/utils/form-rules";
import { editAccess, updateAccess } from "@/services/accessService";
import { Access, EditAccess } from "@/interface/access";
import { getRole } from "@/services/roleService";
import { Role } from "@/interface/role";
import useHandleError from "@/utils/handleError";

export function EditAccessesForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const dispatch: Dispatch<any> = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<Partial<Access>>({});
  const [roles, setRoles] = useState<Role[]>([]);
  const idaccess: string = router.query.id as string;
  const { setError } = useHandleError()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditAccess>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<EditAccess> = async (data) => {
    setIsLoading(true);
    try {
      await updateAccess(+idaccess, data);
      dispatch(
        showToast({
          message: "Success to update access user",
          type: "green",
        })
      );
      setIsLoading(false);
      router.push("/user-access");
    } catch (error: any) {
      dispatch(
        showToast({
          message: error?.response?.data?.message ?? "Failed to update user",
          type: "danger",
        })
      );
      setError(error)
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getEditAccess();
    getRoleList();
  }, []);

  const getEditAccess = async () => {
    try {
      const user = await editAccess(+idaccess);
      setUser(user.user);
    } catch (error: any) {
      dispatch(
        showToast({
          message: error?.response?.data?.message ?? "User not valid",
          type: "danger",
        })
      );
      setError(error)
      router.push("/user-access");
    }
  };

  const getRoleList = async () => {
    try {
      const response = await getRole();
      setRoles(response.roles);
    } catch (error: any) {
      setRoles([]);
    }
  };

  return (
    <div {...props} className={cn("text-center", className)}>
      {user && user.id === +idaccess && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[700px] mx-auto"
        >
          <InputGroup className="w-full">
            <UserIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
            <Input
              type="name"
              placeholder="insert name"
              className="pl-6"
              value={user?.email}
              readOnly
            />
          </InputGroup>

          <Controller
            control={control}
            rules={{ required: formRules.required }}
            defaultValue={user?.roles?.[0]?.name}
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
                    {roles.map((role) => (
                      <option
                        value={role.name}
                        key={role.id}
                      >
                        {role.name}
                      </option>
                    ))}
                  </Select>
                </InputGroup>
                <span className="text-[10px] text-primary float-right">
                  {errors.roles ? errors.roles.message : ""}
                </span>
              </>
            )}
            name="roles"
          />

          <Button
            type="submit"
            theme="primary"
            className="w-full mt-8"
            isLoading={isLoading}
          >
            Edit Access
          </Button>
        </form>
      )}
    </div>
  );
}

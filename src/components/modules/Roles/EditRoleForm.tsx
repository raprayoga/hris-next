import React, { useEffect, useState } from "react";
import { cn } from "@/utils";
import { Input, InputGroup } from "@/components/elements/InputGroup";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import Button from "@/components/elements/Button";
import { useDispatch } from "react-redux";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "@/store/toast";
import { useRouter } from "next/router";
import { formRules, getVariant } from "@/utils/form-rules";
import { EditRole, Role } from "@/interface/role";
import { editRole, updateRole } from "@/services/roleService";
import { MultiSelect } from "react-multi-select-component";
import { getPermission } from "@/services/permissionService";
import useHandleError from "@/utils/handleError";

export function EditRoleForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const dispatch: Dispatch<any> = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [permissionOptions, setPermissionOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [selected, setSelected] = useState<{ label: string; value: string }[]>(
    []
  );
  const [role, setRole] = useState<Partial<Role>>({});
  const { setError } = useHandleError();
  const idrole: string = router.query.id as string;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditRole>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<EditRole> = async (data) => {
    setIsLoading(true);
    const permissions = selected.map((select) => select.value);
    try {
      await updateRole(+idrole, { ...data, permissions });
      dispatch(
        showToast({
          message: "Success to update role",
          type: "green",
        })
      );
      setIsLoading(false);
      router.push("/role");
    } catch (error: any) {
      dispatch(
        showToast({
          message: error?.response?.data?.message ?? "Failed to update role",
          type: "danger",
        })
      );
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getEditRole();
    getPermissionList();
  }, []);

  const getEditRole = async () => {
    try {
      const role = await editRole(+idrole);
      setRole(role.role);
      const selectedPermission = role.role.permissions.map((permission) => ({
        label: permission.name,
        value: permission.name,
      }));
      setSelected(selectedPermission);
    } catch (error: any) {
      dispatch(
        showToast({
          message: error?.response?.data?.message ?? "Role not valid",
          type: "danger",
        })
      );
      setError(error);

      router.push("/role");
    }
  };

  const getPermissionList = async () => {
    try {
      const response = await getPermission();
      const option = response.permissions.map((permission) => ({
        label: permission.name,
        value: permission.name,
      }));
      setPermissionOptions(option);
    } catch (error: any) {
      setPermissionOptions([]);
    }
  };

  return (
    <div {...props} className={cn("text-center", className)}>
      {role && role.id === +idrole && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[700px] mx-auto"
        >
          <Controller
            control={control}
            rules={{ required: formRules.required }}
            defaultValue={role.name}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { isDirty, error },
            }) => (
              <>
                <InputGroup className="w-full">
                  <QrCodeIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                  <Input
                    type="name"
                    placeholder="insert role"
                    className="pl-6"
                    theme={getVariant(isDirty, !!error)}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
                <span className="text-[10px] text-primary float-right">
                  {errors.role ? errors.role.message : ""}
                </span>
              </>
            )}
            name="role"
          />

          <MultiSelect
            options={permissionOptions}
            value={selected}
            onChange={setSelected}
            labelledBy="label"
            className="w-full mt-8"
          />

          <Button
            type="submit"
            theme="primary"
            className="w-full mt-8"
            isLoading={isLoading}
          >
            Edit Role
          </Button>
        </form>
      )}
    </div>
  );
}

import { EditPermission, Permission, PermissionResponse } from "@/interface/permission";
import http from "./baseService";

export const getPermission = async (): Promise<PermissionResponse> => {
  const { data } = await http.get("permission");
  return data;
};

export const deletePermission = async (id: number): Promise<PermissionResponse> => {
  const { data } = await http.delete(`permission/${id}`);
  return data;
};

export const addPermission = async (payload: EditPermission): Promise<PermissionResponse> => {
  const { data } = await http.post('permission', payload);
  return data;
};

export const editPermission = async (id: number): Promise<{permission: Permission}> => {
  const { data } = await http.get(`permission/${id}/edit`);
  return data;
};

export const updatePermission = async (id: number, payload: EditPermission): Promise<{permission: Permission}> => {
  const { data } = await http.put(`permission/${id}`, payload);
  return data;
};
import http from "./baseService";
import { EditRole, Role, RoleResponse } from "@/interface/role";

export const getRole = async (): Promise<RoleResponse> => {
  const { data } = await http.get("role");
  return data;
};

export const deleteRole = async (id: number): Promise<RoleResponse> => {
  const { data } = await http.delete(`role/${id}`);
  return data;
};

export const addRole = async (
  payload: EditRole
): Promise<RoleResponse> => {
  const { data } = await http.post("role", payload);
  return data;
};

export const editRole = async (
  id: number
): Promise<{ role: Role }> => {
  const { data } = await http.get(`role/${id}/edit`);
  return data;
};

export const updateRole = async (
  id: number,
  payload: EditRole
): Promise<{ role: Role }> => {
  const { data } = await http.put(`role/${id}`, payload);
  return data;
};

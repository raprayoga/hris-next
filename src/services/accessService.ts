import http from "./baseService";
import { Access, AccessResponse, EditAccess } from "@/interface/access";

export const getAccess = async (): Promise<AccessResponse> => {
  const { data } = await http.get("access");
  return data;
};

export const editAccess = async (
  id: number
): Promise<{ user: Access }> => {
  const { data } = await http.get(`access/${id}/edit`);
  return data;
};

export const updateAccess = async (
  id: number,
  payload: EditAccess
): Promise<{ user: Access }> => {
  const { data } = await http.put(`access/${id}`, payload);
  return data;
};

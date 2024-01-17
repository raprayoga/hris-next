import http from "./baseService";
import { AddUser, EditUser, User, UserResponse } from "@/interface/user";

export const getUsers = async (): Promise<UserResponse> => {
  const { data } = await http.get("users");
  return data;
};

export const deleteUser = async (id: number): Promise<UserResponse> => {
  const { data } = await http.delete(`users/${id}`);
  return data;
};

export const addUser = async (payload: AddUser): Promise<UserResponse> => {
  const { data } = await http.post('users', payload);
  return data;
};

export const editUser = async (id: number): Promise<{user: User}> => {
  const { data } = await http.get(`users/${id}/edit`);
  return data;
};

export const updateUser = async (id: number, payload: EditUser): Promise<{user: User}> => {
  const { data } = await http.put(`users/${id}`, payload);
  return data;
};
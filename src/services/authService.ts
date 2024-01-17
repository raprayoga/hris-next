import http from "./baseService";
import {
  LoginInputsForm,
  LoginResponse,
} from "@/interface/auth";

export const loginUser = async (
  payload: LoginInputsForm
): Promise<LoginResponse> => {
  const { data } = await http.post("login", payload);
  return data;
};
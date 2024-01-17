import http from "./baseService";
import { ProfileResponse, UserEditInputForm } from "@/interface/user";

export const profile = async (): Promise<ProfileResponse> => {
  const { data } = await http.get("profile");
  return data;
};

export const editProfile = async (
  payload: UserEditInputForm
): Promise<ProfileResponse> => {
  const { data } = await http.put("profile/update", payload);
  return data;
};

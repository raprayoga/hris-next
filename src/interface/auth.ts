import { User } from "./user";

export interface LoginResponse {
  user: User;
  token?: string;
}

export interface AuthSliceState {
  isLogin: boolean;
  loading: boolean;
  error?: null | LoginResponse;
}

export interface LoginInputsForm {
  email: string;
  password: string;
}

export interface RegistResponse {
  status: number;
  message: string;
  data: null;
}

export interface RegistSliceState {
  loading: boolean;
  data: null | RegistResponse;
  error?: null | RegistResponse;
}

export interface RegistInputForm {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password_konfirm: string;
}

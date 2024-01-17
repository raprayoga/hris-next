export interface ProfileResponse {
  user: User
}

export interface ProfileSliceState {
  successFetch: boolean;
  loading: boolean;
  data: null | ProfileResponse;
  error?: null | ProfileResponse;
}

export interface UserEditInputForm {
  name: string;
}

export interface UserResponse {
  users: User[]
}

export interface User {
  id: number,
  name: string,
  email: string,
  job_category_id?: number,
  job_divisi_id?: number
}

export interface AddUser {
  name: string,
  email: string,
  password: string;
  job_category_id?: number;
  job_divisi_id?: number;
}

export interface EditUser {
  name: string,
  email: string,
  job_category_id?: number;
  job_divisi_id?: number;
}
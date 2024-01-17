import http from "./baseService";
import { Category, CategoryResponse, EditCategory } from "@/interface/category";

export const getCategory = async (): Promise<CategoryResponse> => {
  const { data } = await http.get("job-category");
  return data;
};

export const deleteCategory = async (id: number): Promise<CategoryResponse> => {
  const { data } = await http.delete(`job-category/${id}`);
  return data;
};

export const addCategory = async (payload: EditCategory): Promise<CategoryResponse> => {
  const { data } = await http.post('job-category', payload);
  return data;
};

export const editCategory = async (id: number): Promise<{job_category: Category}> => {
  const { data } = await http.get(`job-category/${id}/edit`);
  return data;
};

export const updateCategory = async (id: number, payload: EditCategory): Promise<{job_category: Category}> => {
  const { data } = await http.put(`job-category/${id}`, payload);
  return data;
};
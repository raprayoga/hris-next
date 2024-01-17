import http from "./baseService";
import { Divisi, DivisiResponse, EditDivisi } from "@/interface/divisi";

export const getDivisi = async (): Promise<DivisiResponse> => {
  const { data } = await http.get("job-divisi");
  return data;
};

export const deleteDivisi = async (id: number): Promise<DivisiResponse> => {
  const { data } = await http.delete(`job-divisi/${id}`);
  return data;
};

export const addDivisi = async (payload: EditDivisi): Promise<DivisiResponse> => {
  const { data } = await http.post('job-divisi', payload);
  return data;
};

export const editDivisi = async (id: number): Promise<{job_divisi: Divisi}> => {
  const { data } = await http.get(`job-divisi/${id}/edit`);
  return data;
};

export const updateDivisi = async (id: number, payload: EditDivisi): Promise<{job_divisi: Divisi}> => {
  const { data } = await http.put(`job-divisi/${id}`, payload);
  return data;
};
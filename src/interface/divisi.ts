export interface Divisi {
  id: number
  job_divisi: string
}

export interface DivisiResponse {
  job_divisi: Divisi[]
}

export interface EditDivisi {
  job_divisi: string
}
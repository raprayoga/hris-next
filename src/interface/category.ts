export interface Category {
  id: number
  job_category: string
}

export interface CategoryResponse {
  job_category: Category[]
}

export interface EditCategory {
  job_category: string
}
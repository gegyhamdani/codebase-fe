export type Pagination = {
  totalItems: number
  totalPages: number
  currentPage: number
  limit: number
}

export type ApiResponse<T> = {
  status?: string
  message?: string
  data: T | null
  pagination?: Pagination | null
}

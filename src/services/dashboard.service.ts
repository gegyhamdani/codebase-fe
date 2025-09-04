import axiosInstance from '@/libs/axios-instance'
import type { ApiResponse } from '@/types/api'
import type { Aggregation, SampleData } from '@/types/sampe-data'
import type { DashboardTableParams } from '@/views/dashboard/dashboard-table/DashboardTable.types'

export const getDashboardList = async (params?: DashboardTableParams): Promise<ApiResponse<SampleData[]>> => {
  const response = await axiosInstance.get<ApiResponse<SampleData[]>>('/dashboard/dashboard-list', {
    params
  })

  return response.data
}

export const getDashboardAggregation = async (): Promise<ApiResponse<Aggregation>> => {
  const response = await axiosInstance.get<ApiResponse<Aggregation>>('/dashboard/dashboard-aggregation')

  return response.data
}

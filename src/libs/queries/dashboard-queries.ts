import { queryOptions } from '@tanstack/react-query'

import { getDashboardAggregation, getDashboardList } from '@/services/dashboard.service'
import type { DashboardTableParams } from '@/views/dashboard/dashboard-table/DashboardTable.types'

export const dashboardListOptions = (params?: DashboardTableParams) =>
  queryOptions({
    queryKey: ['dashboard-list', params],
    queryFn: () => getDashboardList(params)
  })

export const dashboardAggregationOptions = () =>
  queryOptions({
    queryKey: ['dashboard-aggregation'],
    queryFn: getDashboardAggregation
  })

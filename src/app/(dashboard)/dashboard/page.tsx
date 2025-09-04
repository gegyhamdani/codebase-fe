import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { dashboardAggregationOptions, dashboardListOptions } from '@/libs/queries/dashboard-queries'
import { getQueryClient } from '@/libs/query-client'
import { dashboardTableSchema } from '@/views/dashboard/dashboard-table/DashboardTable.schemas'
import Dashboard from '@/views/dashboard'
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/constants/fetcher'

const DashboardPage = async ({ searchParams }: { searchParams: Promise<NextSearchParams> }) => {
  const searchParamsObj = await searchParams

  const validationResult = dashboardTableSchema.safeParse({
    page: searchParamsObj.page ? Number(searchParamsObj.page) : undefined,
    limit: searchParamsObj.limit ? Number(searchParamsObj.limit) : undefined
  })

  const validatedParams = validationResult.success
    ? validationResult.data
    : { page: DEFAULT_PAGE, limit: DEFAULT_LIMIT }

  const queryClient = getQueryClient()

  queryClient.prefetchQuery(dashboardListOptions(validatedParams))
  queryClient.prefetchQuery(dashboardAggregationOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard />
    </HydrationBoundary>
  )
}

export default DashboardPage

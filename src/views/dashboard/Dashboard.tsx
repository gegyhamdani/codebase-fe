import { Suspense } from 'react'

import { Skeleton } from '@/components/ui/skeleton/Skeleton'
import DashboardAggregation from './dashboard-aggregation'
import DashboardTable from './dashboard-table'

const Dashboard = () => {
  return (
    <div className='flex h-fit w-full flex-col gap-4'>
      <Suspense fallback={<Skeleton className='h-[73px] w-full' />}>
        <DashboardAggregation />
      </Suspense>
      <Suspense fallback={<Skeleton className='h-[700px] w-full' />}>
        <DashboardTable />
      </Suspense>
    </div>
  )
}

export default Dashboard

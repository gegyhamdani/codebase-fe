'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import Card from '@/components/ui/card'
import CardContent from '@/components/ui/card/card-content'
import CardHeader from '@/components/ui/card/card-header'
import CardTitle from '@/components/ui/card/card-title'
import { dashboardAggregationOptions } from '@/libs/queries/dashboard-queries'
import { formatCurrency } from '@/utils/currency'

const DashboardAggregation = () => {
  const { data } = useSuspenseQuery(dashboardAggregationOptions())

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      <Card>
        <CardHeader>
          <CardTitle>Average Value</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-3xl font-medium'>{formatCurrency(data?.data?.averageValue ?? 0)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Count</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-3xl font-medium'>{data?.data?.totalCount}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Value</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-3xl font-medium'>{formatCurrency(data?.data?.totalValue ?? 0)}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardAggregation

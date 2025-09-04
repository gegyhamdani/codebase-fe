import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import type { ApiResponse } from '@/types/api'
import type { Aggregation } from '@/types/sampe-data'
import { SAMPLE_DATA } from '@/mock-data/dashboard'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    let filteredData = SAMPLE_DATA

    if (category) {
      filteredData = filteredData.filter(item => item.category.toLowerCase() === category.toLowerCase())
    }

    if (status) {
      filteredData = filteredData.filter(item => item.status === status)
    }

    if (startDate) {
      const start = new Date(startDate)

      filteredData = filteredData.filter(item => new Date(item.createdAt) >= start)
    }

    if (endDate) {
      const end = new Date(endDate)

      filteredData = filteredData.filter(item => new Date(item.createdAt) <= end)
    }

    const totalCount = filteredData.length
    const totalValue = filteredData.reduce((sum, item) => sum + item.value, 0)
    const averageValue = totalCount > 0 ? totalValue / totalCount : 0

    const categoryMap = new Map<string, { count: number; totalValue: number }>()

    filteredData.forEach(item => {
      const existing = categoryMap.get(item.category) || { count: 0, totalValue: 0 }

      categoryMap.set(item.category, {
        count: existing.count + 1,
        totalValue: existing.totalValue + item.value
      })
    })

    const categoryBreakdown = Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      count: data.count,
      totalValue: data.totalValue
    }))

    const statusMap = new Map<string, number>()

    filteredData.forEach(item => {
      const existing = statusMap.get(item.status) || 0

      statusMap.set(item.status, existing + 1)
    })

    const statusBreakdown = Array.from(statusMap.entries()).map(([status, count]) => ({
      status,
      count
    }))

    const aggregationData: Aggregation = {
      totalCount,
      totalValue: Math.round(totalValue * 100) / 100,
      averageValue: Math.round(averageValue * 100) / 100,
      categoryBreakdown,
      statusBreakdown
    }

    const response: ApiResponse<Aggregation> = {
      status: 'success',
      message: 'Aggregation data retrieved successfully',
      data: aggregationData
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    const response: ApiResponse<null> = {
      status: 'error',
      message: 'Internal server error',
      data: null
    }

    return NextResponse.json(response, { status: 500 })
  }
}

export async function POST() {
  const response: ApiResponse<null> = {
    status: 'error',
    message: 'Method not allowed',
    data: null
  }

  return NextResponse.json(response, { status: 405 })
}

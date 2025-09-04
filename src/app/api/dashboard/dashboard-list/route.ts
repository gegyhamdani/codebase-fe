import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import type { ApiResponse, Pagination } from '@/types/api'
import type { SampleData } from '@/types/sampe-data'
import { SAMPLE_DATA } from '@/mock-data/dashboard'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    if (page < 1 || limit < 1 || limit > 100) {
      const response: ApiResponse<null> = {
        status: 'error',
        message: 'Invalid pagination parameters. Page must be >= 1, limit must be between 1 and 100',
        data: null
      }

      return NextResponse.json(response, { status: 400 })
    }

    let filteredData = SAMPLE_DATA

    if (category) {
      filteredData = filteredData.filter(item => item.category.toLowerCase() === category.toLowerCase())
    }

    if (status) {
      filteredData = filteredData.filter(item => item.status === status)
    }

    if (search) {
      const searchLower = search.toLowerCase()

      filteredData = filteredData.filter(
        item => item.title.toLowerCase().includes(searchLower) || item.description.toLowerCase().includes(searchLower)
      )
    }

    const totalItems = filteredData.length
    const totalPages = Math.ceil(totalItems / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = filteredData.slice(startIndex, endIndex)

    const pagination: Pagination = {
      totalItems,
      totalPages,
      currentPage: page,
      limit
    }

    const response: ApiResponse<SampleData[]> = {
      status: 'success',
      message: 'Data retrieved successfully',
      data: paginatedData,
      pagination
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

'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useSuspenseQuery } from '@tanstack/react-query'

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { columns } from './DashboardTable.constants'
import { dashboardListOptions } from '@/libs/queries/dashboard-queries'
import { dashboardTableSchema } from './DashboardTable.schemas'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import { nextSearchParamsToObj, objectToSearchParams } from '@/utils/params'
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/constants/fetcher'

const DashboardTable = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchParamsObj = nextSearchParamsToObj(searchParams)

  const validatedParams = dashboardTableSchema.safeParse({
    page: Number(searchParamsObj.page),
    limit: Number(searchParamsObj.limit)
  })

  const currentPage = validatedParams.success ? validatedParams.data.page : DEFAULT_PAGE
  const currentLimit = validatedParams.success ? validatedParams.data.limit : DEFAULT_LIMIT

  const { data } = useSuspenseQuery(dashboardListOptions({ page: currentPage, limit: currentLimit }))
  const tableData = data?.data || []
  const paginationData = data?.pagination

  const handleChangePage = (page: number) => {
    if (currentPage === page) return

    const newParams = objectToSearchParams({ obj: searchParamsObj, overrides: { ['page']: String(page) } })

    router.replace(`?${newParams}`, { scroll: false })
  }

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: paginationData?.totalPages ?? 0,
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: paginationData?.limit ?? DEFAULT_LIMIT
      }
    },
    onPaginationChange: updater => {
      if (typeof updater === 'function') {
        const newPagination = updater({
          pageIndex: currentPage - 1,
          pageSize: paginationData?.limit ?? DEFAULT_LIMIT
        })

        handleChangePage(newPagination.pageIndex + 1)
      }
    }
  })

  return (
    <Card className='space-y-4 px-0 py-4'>
      <h2 className='px-4 text-2xl font-semibold'>Product</h2>
      <div className='overflow-hidden border-y'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between px-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          Showing {(currentPage - 1) * currentLimit + 1} to{' '}
          {Math.min(currentPage * currentLimit, paginationData?.totalItems ?? 0)} of {paginationData?.totalItems ?? 0}{' '}
          results
        </div>
        <div className='flex items-center space-x-6 lg:space-x-8'>
          <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
            Page {currentPage} of {paginationData?.totalPages ?? 1}
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='icon'
              className='hidden size-8 lg:flex'
              onClick={() => handleChangePage(1)}
              disabled={currentPage <= 1}
            >
              <span className='sr-only'>Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant='outline'
              size='icon'
              className='size-8'
              onClick={() => handleChangePage(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              <span className='sr-only'>Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant='outline'
              size='icon'
              className='size-8'
              onClick={() => handleChangePage(currentPage + 1)}
              disabled={currentPage >= (paginationData?.totalPages ?? 1)}
            >
              <span className='sr-only'>Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant='outline'
              size='icon'
              className='hidden size-8 lg:flex'
              onClick={() => handleChangePage(paginationData?.totalPages ?? 1)}
              disabled={currentPage >= (paginationData?.totalPages ?? 1)}
            >
              <span className='sr-only'>Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default DashboardTable

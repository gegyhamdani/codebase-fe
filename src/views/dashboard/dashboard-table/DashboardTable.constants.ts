import type { ColumnDef } from '@tanstack/react-table'

import type { SampleData } from '@/types/sampe-data'
import { formatCurrency } from '@/utils/currency'

export const columns: ColumnDef<SampleData>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'title',
    header: 'TITLE'
  },
  {
    accessorKey: 'category',
    header: 'CATEGORY'
  },
  {
    accessorKey: 'value',
    header: 'PRICE',
    cell: ({ row }) => {
      const value = parseFloat(row.getValue('value'))

      const formatted = formatCurrency(value)

      return formatted
    }
  },
  {
    accessorKey: 'status',
    header: 'STATUS'
  },
  {
    accessorKey: 'createdAt',
    header: 'CREATED AT',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))

      return date.toLocaleDateString()
    }
  }
]

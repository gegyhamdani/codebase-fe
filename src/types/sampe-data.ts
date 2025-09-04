export type SampleData = {
  id: string
  title: string
  description: string
  category: string
  value: number
  createdAt: string
  status: 'active' | 'inactive' | 'pending'
}

export type Aggregation = {
  totalCount: number
  totalValue: number
  averageValue: number
  categoryBreakdown: {
    category: string
    count: number
    totalValue: number
  }[]
  statusBreakdown: {
    status: string
    count: number
  }[]
}

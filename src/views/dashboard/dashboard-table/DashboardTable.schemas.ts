import { z } from 'zod/v4'

export const dashboardTableSchema = z.object({
  page: z.number().min(1).default(1).catch(1),
  limit: z.number().min(1).max(100).default(10).catch(10)
})

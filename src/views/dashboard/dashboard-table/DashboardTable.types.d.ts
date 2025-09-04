import type { z } from 'zod'

import type { dashboardTableSchema } from './DashboardTable.schemas'

export type DashboardTableParams = z.infer<typeof dashboardTableSchema>

import { ChevronRight } from 'lucide-react'

import { cn } from '@/utils/commons'

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<'li'>) => (
  <li role='presentation' aria-hidden='true' className={cn('[&>svg]:h-3.5 [&>svg]:w-3.5', className)} {...props}>
    {children ?? <ChevronRight />}
  </li>
)

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

export default BreadcrumbSeparator

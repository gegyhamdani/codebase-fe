import React from 'react'

import { cn } from '@/utils/commons'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
)

CardFooter.displayName = 'CardFooter'

export default CardFooter

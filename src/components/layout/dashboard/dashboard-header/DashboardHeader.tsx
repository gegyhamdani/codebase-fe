'use client'

import { usePathname } from 'next/navigation'

import Breadcrumb from '@/components/ui/breadcrumb'
import BreadcrumbItem from '@/components/ui/breadcrumb/breadcrumb-item'
import BreadcrumbLink from '@/components/ui/breadcrumb/breadcrumb-link'
import BreadcrumbList from '@/components/ui/breadcrumb/breadcrumb-list'
import BreadcrumbPage from '@/components/ui/breadcrumb/breadcrumb-page'
import BreadcrumbSeparator from '@/components/ui/breadcrumb/breadcrumb-separator'
import { generateBreadcrumbs } from './DashboardHeader.helpers'

const DashboardHeader = () => {
  const pathname = usePathname()
  const breadcrumbs = generateBreadcrumbs(pathname)

  return (
    <header className='flex items-center justify-between'>
      <div className='relative w-full border-b-2 p-4'>
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map(breadcrumb => (
              <div key={breadcrumb.href} className='flex items-center'>
                <BreadcrumbItem>
                  {breadcrumb.isLast ? (
                    <BreadcrumbPage>{breadcrumb.text}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.text}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!breadcrumb.isLast && <BreadcrumbSeparator />}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}

export default DashboardHeader

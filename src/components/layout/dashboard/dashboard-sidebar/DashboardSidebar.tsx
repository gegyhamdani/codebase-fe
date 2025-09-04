'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { MENUS } from '@/constants/menus'
import { cn } from '@/utils/commons'

const DashboardSidebar = () => {
  const pathname = usePathname()

  return (
    <aside className='sticky w-[260px] min-w-[260px] [block-size:100dvh] [inset-block-start:0px]'>
      <div className='relative h-full w-full border-r-2'>
        <div className='relative z-10 flex h-full flex-col gap-5 overflow-y-auto overflow-x-hidden'>
          <Image className='p-5 dark:invert' src='/next.svg' alt='Next.js logo' width={180} height={38} priority />
          <div className='relative h-full'>
            <nav>
              <ul className='flex flex-col gap-2'>
                {MENUS.map(menu => {
                  const isActive = pathname === menu.href
                  const IconComponent = menu.icon

                  return (
                    <Link key={menu.title} href={menu.href}>
                      <li
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 transition-all',
                          isActive ? 'bg-primary font-medium text-primary-foreground' : 'hover:bg-secondary'
                        )}
                      >
                        <IconComponent size={20} />
                        <span>{menu.title}</span>
                      </li>
                    </Link>
                  )
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default DashboardSidebar

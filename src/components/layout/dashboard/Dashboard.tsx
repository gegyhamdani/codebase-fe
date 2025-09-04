import DashboardHeader from './dashboard-header'
import DashboardSidebar from './dashboard-sidebar'

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex min-h-svh w-full flex-auto'>
      <DashboardSidebar />
      <div className='flex w-full flex-col [min-inline-size:0]'>
        <DashboardHeader />
        <div className='flex h-full w-full flex-auto overflow-auto bg-gray-50 p-0 sm:p-4'>{children}</div>
      </div>
    </main>
  )
}

export default Dashboard

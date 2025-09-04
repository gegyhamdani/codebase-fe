import Providers from '@/components/common/providers'
import Dashboard from '@/components/layout/dashboard'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <Dashboard>{children}</Dashboard>
    </Providers>
  )
}

export default DashboardLayout

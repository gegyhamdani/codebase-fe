import Providers from '@/components/common/providers'

const BlankLayout = async ({ children }: { children: React.ReactNode }) => {
  return <Providers>{children}</Providers>
}

export default BlankLayout

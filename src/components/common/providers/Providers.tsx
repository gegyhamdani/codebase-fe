import { ToastContainer } from 'react-toastify'

import { NextAuthProvider } from '@/contexts/nextAuthProviders'
import ReactQueryProvider from '@/contexts/reactQueryProviders'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <NextAuthProvider basePath={process.env.NEXTAUTH_BASEPATH}>
        {children}
        <ToastContainer position='top-right' hideProgressBar autoClose={5000} />
      </NextAuthProvider>
    </ReactQueryProvider>
  )
}

export default Providers

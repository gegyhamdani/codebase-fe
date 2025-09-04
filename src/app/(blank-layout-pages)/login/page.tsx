import type { Metadata } from 'next'

import Login from '@/views/login'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account'
}

const LoginPage = () => {
  return <Login />
}

export default LoginPage

import { redirect } from 'next/navigation'

import type { AxiosInstance, AxiosError } from 'axios'
import axios from 'axios'
import { getSession, signOut } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { toast } from 'react-toastify'
import qs from 'qs'

import { authOptions } from './auth'
import { API_BASE_URL } from '@/constants/fetcher'

if (!process.env.NEXT_PUBLIC_API_URL && !process.env.API_URL) {
  console.warn('API base URL is not set.')
}

class ApiRequestError extends Error {
  constructor(
    message: string,
    public status?: number,
    public details?: unknown
  ) {
    super(message)
    this.name = 'ApiRequestError'
  }
}

const isClient = () => typeof window !== 'undefined' && typeof document !== 'undefined'

const sessionManager = {
  async getSession() {
    if (isClient()) {
      return await getSession()
    } else {
      return await getServerSession(authOptions)
    }
  },

  async getToken() {
    const session = await this.getSession()

    return session?.user?.token
  },

  async handleAuthError() {
    if (isClient()) {
      await signOut({ callbackUrl: '/?auth_error=session_expired' })
    } else {
      redirect('/api/auth/signout?callbackUrl=' + encodeURIComponent('/?auth_error=session_expired'))
    }
  }
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  timeout: 600000,
  paramsSerializer: params =>
    qs.stringify(params, {
      arrayFormat: 'repeat',
      skipNulls: true,
      filter: (prefix, value) => {
        if (Array.isArray(value) && value.length === 0) {
          return undefined
        }

        if (typeof value === 'string' && value.trim() === '') {
          return undefined
        }

        return value
      }
    })
})

axiosInstance.interceptors.request.use(
  async config => {
    const token = await sessionManager.getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
    }

    return config
  },
  error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  response => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Response: ${response.status} ${response.config.url}`)
    }

    return response
  },
  async (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response

      if (status === 401 && !error.config?.url?.includes('login')) {
        await sessionManager.handleAuthError()
        throw new ApiRequestError('Unauthorized', status)
      }

      let errorMessage = `HTTP ${status}: ${error.response.statusText}`
      let errorDetails: unknown

      if (data && typeof data === 'object') {
        if ('message' in data && typeof data.message === 'string') {
          errorMessage = data.message
        }

        if ('details' in data) {
          errorDetails = data.details
        }
      }

      if (process.env.NODE_ENV === 'development') {
        console.error('API Error:', {
          status,
          message: errorMessage,
          url: error.config?.url,
          details: errorDetails
        })
      }

      if (isClient()) {
        toast.error(errorMessage)
      }

      throw new ApiRequestError(errorMessage, status, errorDetails)
    } else if (error.request) {
      console.error('Network error:', error.message)

      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        const timeoutMessage = 'Request timeout - Please check your connection and try again'

        if (isClient()) {
          toast.error(timeoutMessage)
        }

        throw new ApiRequestError(timeoutMessage)
      }

      const networkMessage = 'Network connection failed - Please check your internet connection'

      if (isClient()) {
        toast.error(networkMessage)
      }

      throw new ApiRequestError(networkMessage)
    } else {
      console.error('Request setup error:', error.message)

      if (isClient()) {
        toast.error('Request configuration error')
      }

      throw new ApiRequestError('Request configuration error')
    }
  }
)

export { sessionManager }

export default axiosInstance

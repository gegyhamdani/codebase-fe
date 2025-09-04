import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import type { ApiResponse } from '@/types/api'
import type { LoginRequest, LoginResponse } from '@/types/auth'

// Dummy user data
const DUMMY_USERS = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    email: 'admin@example.com'
  },
  {
    id: '2',
    username: 'user1',
    password: 'password123',
    email: 'user1@example.com'
  },
  {
    id: '3',
    username: 'demo',
    password: 'demo123',
    email: 'demo@example.com'
  }
]

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json()
    const { username, password } = body

    if (!username || !password) {
      const response: ApiResponse<null> = {
        status: 'error',
        message: 'Username and password are required',
        data: null
      }

      return NextResponse.json(response, { status: 400 })
    }

    const user = DUMMY_USERS.find(u => u.username === username && u.password === password)

    if (!user) {
      const response: ApiResponse<null> = {
        status: 'error',
        message: 'Invalid username or password',
        data: null
      }

      return NextResponse.json(response, { status: 401 })
    }

    const token = `dummy-token-${user.id}-${Date.now()}`

    const loginResponse: LoginResponse = {
      token,
      userId: user.id,
      username: user.username,
      email: user.email
    }

    const response: ApiResponse<LoginResponse> = {
      status: 'success',
      message: 'Login successful',
      data: loginResponse
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    const response: ApiResponse<null> = {
      status: 'error',
      message: 'Internal server error',
      data: null
    }

    return NextResponse.json(response, { status: 500 })
  }
}

export async function GET() {
  const response: ApiResponse<null> = {
    status: 'error',
    message: 'Method not allowed',
    data: null
  }

  return NextResponse.json(response, { status: 405 })
}

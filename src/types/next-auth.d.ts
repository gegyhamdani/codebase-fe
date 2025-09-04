import 'next-auth'
import 'next-auth/jwt'
import type { UserProfile } from './user'

declare module 'next-auth' {
  interface User extends UserProfile {
    id: string
  }
  interface Session {
    user: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends UserProfile {
    id: string
  }
}

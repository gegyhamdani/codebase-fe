export type LoginRequest = {
  username: string
  password: string
}

export type LoginResponse = {
  token: string
  userId: string
  username: string
  email: string
}

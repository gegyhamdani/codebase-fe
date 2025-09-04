export type User = {
  id: string
  username: string
  email: string
  createdAt: string
  updatedAt: string
}

export type UserProfile = {
  token: string
  profile: {
    userId: string
    username: string
    email: string
  }
}

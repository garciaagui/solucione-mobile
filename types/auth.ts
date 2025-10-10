import { User } from './user'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  user: User
}

export interface GetMeResponse {
  message: string
  user: User
}

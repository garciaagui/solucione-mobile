import api from '@/services/api'
import { GetMeResponse, LoginRequest, LoginResponse } from '@/types/auth'

export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', credentials)
  return response.data
}

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout')
}

export const getMe = async (): Promise<GetMeResponse> => {
  const response = await api.get<GetMeResponse>('/auth/me')
  return response.data
}

import api from '@/services/api'
import { LoginRequest, LoginResponse } from '@/types/auth'

export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', credentials)
  return response.data
}

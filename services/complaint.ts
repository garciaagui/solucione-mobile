import { Complaint } from '@/types/complaint'

import api from './api'

export const getComplaints = async (): Promise<Complaint[]> => {
  const response = await api.get<Complaint[]>('/complaints')
  return response.data
}

export const createComplaint = async (data: FormData): Promise<any> => {
  const response = await api.post<any>('/complaints', data)
  return response.data
}

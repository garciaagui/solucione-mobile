import { Complaint } from '@/types/complaint'

import api from './api'

export const getComplaints = async (): Promise<Complaint[]> => {
  const response = await api.get<Complaint[]>('/complaints')
  return response.data
}

import { Complaint, NewComplaintResponse } from '@/types/complaint'

import api from './api'

export const getComplaints = async (): Promise<Complaint[]> => {
  const response = await api.get<Complaint[]>('/complaints')
  return response.data
}

export const createComplaint = async (
  data: FormData
): Promise<NewComplaintResponse> => {
  const response = await api.post<NewComplaintResponse>('/complaints', data)
  return response.data
}

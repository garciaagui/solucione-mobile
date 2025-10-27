import { Complaint, NewComplaintResponse } from '@/types/complaint'

import api from './api'

export const getComplaints = async (): Promise<Complaint[]> => {
  const response = await api.get<Complaint[]>('/complaints')
  return response.data
}

export const getComplaintById = async (id: string): Promise<Complaint> => {
  const response = await api.get<Complaint>(`/complaints/${id}`)
  return response.data
}

export const getUserComplaints = async (): Promise<Complaint[]> => {
  const response = await api.get<Complaint[]>('/complaints/user')
  return response.data
}

export const createComplaint = async (
  data: FormData
): Promise<NewComplaintResponse> => {
  const response = await api.post<NewComplaintResponse>('/complaints', data)
  return response.data
}

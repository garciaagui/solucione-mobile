import { NewReplyResponse } from '@/types/reply'

import api from './api'

export const createReply = async (
  data: FormData
): Promise<NewReplyResponse> => {
  const response = await api.post<NewReplyResponse>('/admin/replies', data)
  return response.data
}

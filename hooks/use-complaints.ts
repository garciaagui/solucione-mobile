import { useQuery } from '@tanstack/react-query'

import { COMPLAINTS_QUERY_KEY } from '@/constants/query-keys'
import { getComplaints } from '@/services/complaint'
import { Complaint } from '@/types/complaint'

export const useComplaints = () => {
  const { data, error, isLoading } = useQuery<Complaint[]>({
    queryKey: [COMPLAINTS_QUERY_KEY],
    queryFn: getComplaints
  })

  return { data, error, isLoading }
}

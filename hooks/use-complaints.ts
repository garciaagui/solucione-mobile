import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { COMPLAINTS_QUERY_KEY } from '@/constants/query-keys'
import { getComplaints } from '@/services/complaint'
import { Complaint } from '@/types/complaint'

export const useComplaints = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const {
    data,
    error,
    isLoading: isLoadingQuery,
    refetch: refetchQuery
  } = useQuery<Complaint[]>({
    queryKey: [COMPLAINTS_QUERY_KEY],
    queryFn: getComplaints
  })

  const refetch = async () => {
    setIsRefreshing(true)
    await refetchQuery()
    setIsRefreshing(false)
  }

  const isLoading = isLoadingQuery || isRefreshing

  return { data, error, isLoading, refetch }
}

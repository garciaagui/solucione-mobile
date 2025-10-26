import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { COMPLAINTS_QUERY_KEY } from '@/constants/query-keys'
import { getUserComplaints } from '@/services/complaint'
import { Complaint } from '@/types/complaint'

export const useUserComplaints = (userId?: string) => {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const {
    data,
    error,
    isLoading: isLoadingQuery,
    refetch: refetchQuery
  } = useQuery<Complaint[]>({
    queryKey: [COMPLAINTS_QUERY_KEY, userId],
    queryFn: getUserComplaints,
    enabled: !!userId
  })

  const refetch = async () => {
    setIsRefreshing(true)
    await refetchQuery()
    setIsRefreshing(false)
  }

  const isLoading = isLoadingQuery || isRefreshing

  return { data, error, isLoading, refetch }
}

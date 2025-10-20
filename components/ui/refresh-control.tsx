import { useCallback, useState } from 'react'
import {
  RefreshControl as RNRefreshControl,
  RefreshControlProps
} from 'react-native'

import { useTheme } from '@/contexts/theme-context'

interface Props extends Omit<RefreshControlProps, 'refreshing' | 'onRefresh'> {
  handleRefetch: () => Promise<unknown>
  isLoading?: boolean
}

export default function RefreshControl({
  handleRefetch,
  isLoading = false,
  ...props
}: Props) {
  const [refreshing, setRefreshing] = useState(false)

  const { colors } = useTheme()

  const COLOR = colors.primary
  const BG_COLOR = colors.backgroundAlt

  const onRefresh = useCallback(async () => {
    if (isLoading) {
      return
    }

    setRefreshing(true)

    try {
      await handleRefetch()
    } finally {
      setTimeout(() => {
        setRefreshing(false)
      }, 300)
    }
  }, [handleRefetch, isLoading])

  return (
    <RNRefreshControl
      {...props}
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={COLOR} // ios
      colors={[COLOR]} // android
      enabled={!isLoading} // android
      progressBackgroundColor={BG_COLOR} // android
    />
  )
}

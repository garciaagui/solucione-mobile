import React, { ReactNode, useEffect } from 'react'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated'

import { useTheme } from '@/contexts/theme-context'

interface SkeletonProps {
  width: number
  height: number
  children?: ReactNode
  rounded?: boolean
  style?: object
}

export default function Skeleton({
  width,
  height,
  children,
  rounded = false,
  style
}: SkeletonProps) {
  const { colors } = useTheme()
  const opacity = useSharedValue(0.3)
  const borderRadius = rounded ? 9999 : 8

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease)
      }),
      -1, // infinite repetitions
      true // reverse (go and come back)
    )
  }, [opacity])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    }
  })

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          width,
          height,
          borderRadius,
          backgroundColor: colors.skeleton
        },
        style
      ]}>
      {children}
    </Animated.View>
  )
}

import { StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

import { useTheme } from '@/contexts/theme-context'
import { getPasswordRequirements } from '@/functions/password'

interface PasswordValidatorProps {
  password: string
  isFocused?: boolean
  hasError?: boolean
}

interface RequirementItemProps {
  label: string
  isValid: boolean
}

function RequirementItem({ label, isValid }: RequirementItemProps) {
  const { colors } = useTheme()

  const bgColor = isValid ? colors.success : colors.textError
  const animatedTextColor = useAnimatedStyle(() => {
    return {
      color: withTiming(isValid ? colors.textSecondary : colors.textError, {
        duration: 300
      })
    }
  })

  return (
    <View style={styles.item}>
      <View style={[styles.circle, { backgroundColor: bgColor }]} />
      <Animated.Text style={[styles.itemText, animatedTextColor]}>
        {label}
      </Animated.Text>
    </View>
  )
}

export default function PasswordValidator({
  password,
  isFocused = false,
  hasError = false
}: PasswordValidatorProps) {
  if (!isFocused && !hasError) {
    return null
  }

  const REQUIREMENTS = getPasswordRequirements(password)

  return (
    <View style={styles.container}>
      {REQUIREMENTS.map(({ label, isValid }, index) => (
        <RequirementItem key={label} label={label} isValid={isValid} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  circle: {
    width: 8,
    height: 8,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    gap: 4,
    marginTop: -8,
    paddingHorizontal: 8
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  itemText: {
    fontSize: 12,
    flex: 1
  }
})

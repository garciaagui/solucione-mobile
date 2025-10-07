import { ComponentType, forwardRef, useMemo, useState } from 'react'
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View
} from 'react-native'

import Text from '@/components/ui/text'
import { useTheme } from '@/contexts/theme-context'
import { IconProps, ThemeColors } from '@/types/ui'

import { EyeIcon, EyeOffIcon } from '../icons'

interface Props extends TextInputProps {
  variant: 'text' | 'password'
  errorMessage?: string
  icon?: ComponentType<IconProps>
}

export const Input = forwardRef<TextInput, Props>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  const { variant, errorMessage, icon: Icon, editable = true, ...rest } = props
  const { colors } = useTheme()

  const styles = useMemo(() => createStyles(colors), [colors])
  const borderColor = errorMessage ? colors.borderError : colors.border

  const secureTextEntry = variant === 'password'
  const onError = !!errorMessage
  const isDisabled = !editable

  return (
    <View style={[styles.container, isDisabled && { opacity: 0.7 }]}>
      <View style={[styles.inputContainer, { borderColor }]}>
        <View style={styles.inputContent}>
          {Icon ? (
            <Icon
              size={16}
              color={onError ? colors.textError : colors.textPrimary}
            />
          ) : null}

          <TextInput
            ref={ref}
            editable={editable}
            placeholderTextColor={colors.textTertiary}
            secureTextEntry={secureTextEntry && !showPassword}
            style={styles.input}
            {...rest}
          />
        </View>

        {secureTextEntry ? (
          <TouchableOpacity
            disabled={isDisabled}
            onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeIcon color={colors.textTertiary} size={16} />
            ) : (
              <EyeOffIcon color={colors.textTertiary} size={16} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>

      {errorMessage ? (
        <Text size="xs" variant="error" style={styles.errorMessage}>
          {errorMessage}
        </Text>
      ) : null}
    </View>
  )
})

Input.displayName = 'Input'

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      gap: 8,
      width: '100%'
    },
    errorMessage: {
      marginLeft: 3
    },
    input: {
      paddingVertical: 0,
      flex: 1,
      color: theme.textPrimary,
      fontSize: 16
    },
    inputContainer: {
      alignItems: 'center',
      borderRadius: 12,
      borderWidth: 1,
      flexDirection: 'row',
      gap: 8,
      justifyContent: 'space-between',
      paddingHorizontal: 14,
      paddingVertical: 10
    },
    inputContent: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      gap: 8
    }
  })

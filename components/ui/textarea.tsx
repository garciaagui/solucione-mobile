import { ComponentType, forwardRef, useMemo } from 'react'
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'

import Text from '@/components/ui/text'
import { useTheme } from '@/contexts/theme-context'
import { IconProps, ThemeColors } from '@/types/ui'

interface Props extends Omit<TextInputProps, 'multiline'> {
  errorMessage?: string
  icon?: ComponentType<IconProps>
  label?: string
  required?: boolean
  minHeight?: number
  maxLength?: number
  showCharCount?: boolean
}

export const Textarea = forwardRef<TextInput, Props>((props, ref) => {
  const {
    errorMessage,
    icon: Icon,
    editable = true,
    label,
    required = false,
    minHeight = 100,
    maxLength,
    showCharCount = false,
    value,
    ...rest
  } = props
  const { colors } = useTheme()

  const styles = useMemo(
    () => createStyles(colors, minHeight),
    [colors, minHeight]
  )
  const borderColor = errorMessage ? colors.borderError : colors.border

  const onError = !!errorMessage
  const isDisabled = !editable
  const currentLength = typeof value === 'string' ? value.length : 0

  return (
    <View style={[styles.container, isDisabled && { opacity: 0.7 }]}>
      {label ? (
        <View style={styles.labelContainer}>
          <Text size="md" weight="semibold" variant="secondary">
            {label}
          </Text>
          {required ? (
            <Text size="sm" variant="error">
              {' '}
              *
            </Text>
          ) : null}
        </View>
      ) : null}

      <View style={[styles.textareaContainer, { borderColor }]}>
        <View style={styles.textareaContent}>
          {Icon ? (
            <View style={styles.iconContainer}>
              <Icon
                size={16}
                color={onError ? colors.textError : colors.textPrimary}
              />
            </View>
          ) : null}

          <TextInput
            ref={ref}
            editable={editable}
            multiline={true}
            placeholderTextColor={colors.textTertiary}
            style={styles.textarea}
            maxLength={maxLength}
            value={value}
            {...rest}
          />
        </View>

        {showCharCount && maxLength ? (
          <View style={styles.charCountContainer}>
            <Text
              size="xs"
              variant={currentLength > maxLength ? 'error' : 'tertiary'}>
              {currentLength} / {maxLength}
            </Text>
          </View>
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

Textarea.displayName = 'Textarea'

const createStyles = (theme: ThemeColors, minHeight: number) =>
  StyleSheet.create({
    container: {
      gap: 6,
      width: '100%'
    },
    errorMessage: {
      marginLeft: 4,
      marginTop: 2
    },
    textarea: {
      paddingVertical: 0,
      flex: 1,
      color: theme.textPrimary,
      fontSize: 16,
      textAlignVertical: 'top',
      minHeight
    },
    textareaContainer: {
      borderRadius: 12,
      borderWidth: 1,
      paddingHorizontal: 14,
      paddingVertical: 12
    },
    textareaContent: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'flex-start'
    },
    iconContainer: {
      paddingTop: 2
    },
    labelContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    charCountContainer: {
      alignItems: 'flex-end',
      marginTop: 4,
      marginRight: 4
    }
  })

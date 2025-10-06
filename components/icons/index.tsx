import Feather from '@expo/vector-icons/Feather'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { IconProps } from '@/types/ui'

export function EmailIcon({
  size = 24,
  color = 'white',
  className
}: IconProps) {
  return (
    <MaterialIcons
      name="alternate-email"
      size={size}
      color={color}
      className={className}
    />
  )
}

export function EyeIcon({ size = 24, color = 'white', className }: IconProps) {
  return <Feather name="eye" size={size} color={color} className={className} />
}

export function EyeOffIcon({
  size = 24,
  color = 'white',
  className
}: IconProps) {
  return (
    <Feather name="eye-off" size={size} color={color} className={className} />
  )
}

export function LockIcon({ size = 24, color = 'white', className }: IconProps) {
  return (
    <FontAwesome name="lock" size={size} color={color} className={className} />
  )
}

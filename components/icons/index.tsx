import Feather from '@expo/vector-icons/Feather'

import { IconProps } from '@/types/ui'

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

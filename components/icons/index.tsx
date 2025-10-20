import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from '@expo/vector-icons/Feather'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { IconProps } from '@/types/ui'

export function AdminIcon({
  size = 24,
  color = 'white',
  className
}: IconProps) {
  return (
    <FontAwesome5
      name="user-cog"
      size={size}
      color={color}
      className={className}
    />
  )
}

export function CheckIcon({
  size = 24,
  color = 'white',
  className
}: IconProps) {
  return (
    <Feather name="check" size={size} color={color} className={className} />
  )
}

export function ClipboardIcon({
  size = 24,
  color = 'white',
  className
}: IconProps) {
  return (
    <FontAwesome5
      name="clipboard-list"
      size={size}
      color={color}
      className={className}
    />
  )
}

export function ClockCircleIcon({
  size = 24,
  color = 'white',
  className
}: IconProps) {
  return (
    <AntDesign
      name="clock-circle"
      size={size}
      color={color}
      className={className}
    />
  )
}

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

export function HomeIcon({ size = 24, color = 'white', className }: IconProps) {
  return (
    <FontAwesome5 name="home" size={size} color={color} className={className} />
  )
}

export function LibraryIcon({
  size = 24,
  color = 'white',
  className
}: IconProps) {
  return (
    <MaterialIcons
      name="library-books"
      size={size}
      color={color}
      className={className}
    />
  )
}

export function LibraryAddIcon({
  size = 24,
  color = 'white',
  className
}: IconProps) {
  return (
    <MaterialIcons
      name="library-add"
      size={size}
      color={color}
      className={className}
    />
  )
}

export function LockIcon({ size = 24, color = 'white', className }: IconProps) {
  return (
    <FontAwesome name="lock" size={size} color={color} className={className} />
  )
}

export function LogInIcon({
  size = 24,
  color = 'white',
  className
}: IconProps) {
  return (
    <MaterialIcons
      name="login"
      size={size}
      color={color}
      className={className}
    />
  )
}

export function LogOutIcon({
  size = 24,
  color = 'white',
  className
}: IconProps) {
  return (
    <MaterialIcons
      name="logout"
      size={size}
      color={color}
      className={className}
    />
  )
}

export function LoaderIcon({
  size = 24,
  color = 'white',
  className
}: IconProps) {
  return (
    <Feather name="loader" size={size} color={color} className={className} />
  )
}

export function PlusIcon({ size = 24, color = 'white', className }: IconProps) {
  return <Feather name="plus" size={size} color={color} className={className} />
}

export function UserIcon({ size = 24, color = 'white', className }: IconProps) {
  return (
    <FontAwesome5
      name="user-alt"
      size={size}
      color={color}
      className={className}
    />
  )
}

export function UserUnauthenticatedIcon({
  size = 24,
  color = 'white',
  className
}: IconProps) {
  return (
    <FontAwesome5
      name="user-times"
      size={size}
      color={color}
      className={className}
    />
  )
}

export function XIcon({ size = 24, color = 'white', className }: IconProps) {
  return <Feather name="x" size={size} color={color} className={className} />
}

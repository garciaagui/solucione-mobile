import AsyncStorage from '@react-native-async-storage/async-storage'

import { USER_STORAGE_KEY } from '@/constants/storage-keys'
import { User } from '@/types/user'

export const saveUserToStorage = async (user: User): Promise<void> => {
  const stringifiedUser = JSON.stringify(user)
  await AsyncStorage.setItem(USER_STORAGE_KEY, stringifiedUser)
}

export const getUserFromStorage = async (): Promise<User | null> => {
  const stringifiedUser = await AsyncStorage.getItem(USER_STORAGE_KEY)

  if (!stringifiedUser) {
    return null
  }

  const parsedUser = JSON.parse(stringifiedUser) as User

  return parsedUser
}

export const removeUserFromStorage = async (): Promise<void> => {
  await AsyncStorage.removeItem(USER_STORAGE_KEY)
}

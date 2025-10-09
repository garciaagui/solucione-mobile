import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import React, { createContext, ReactNode, useContext, useState } from 'react'

import { handleMutationError } from '@/functions/error'
import { removeUserFromStorage, saveUserToStorage } from '@/functions/storage'
import { showSuccessToast } from '@/functions/toast'
import { login as loginService, logout as logoutService } from '@/services/auth'
import { LoginRequest } from '@/types/auth'
import { User } from '@/types/user'

interface AuthContextValues {
  user: User | null
  isLoading: boolean
  isLoggingIn: boolean
  isLoggingOut: boolean
  isAuthenticated: boolean
  login: (credentials: LoginRequest) => void
  logout: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const isAuthenticated = !!user

  // useEffect(() => {
  //   const loadInitialData = async () => {
  //     try {
  //       setIsLoading(true)

  //       const [storedUser, storedAccessToken] = await Promise.all([
  //         getUserFromStorage(),
  //         getAccessTokenFromStorage()
  //       ])

  //       if (storedAccessToken) {
  //         if (storedUser) {
  //           setUser(storedUser)
  //         }
  //         await getMeMutation.mutateAsync()
  //       } else {
  //         setUser(null)
  //       }
  //     } catch (error) {
  //       console.error('Error loading initial data:', error)
  //       if (user) {
  //         await handleLogout()
  //       }
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   // Register the callback to handle refresh token expired
  //   setExpiredRefreshTokenCallback(handleRefreshTokenExpired)

  //   loadInitialData()
  // }, [])

  const handleLogout = () => {
    setUser(null)
    removeUserFromStorage()
  }

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: (credentials: LoginRequest) => {
      const response = loginService(credentials)
      return response
    },
    onSuccess: async ({ user }) => {
      saveUserToStorage(user)
      router.replace('/')
      showSuccessToast('Sucesso!', 'Login realizado com sucesso.')
    },
    onError: error => {
      handleMutationError(error, 'Erro inesperado durante o login.')
    }
  })

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: () => {
      const response = logoutService()
      return response
    },
    onSuccess: async () => {
      handleLogout()
      showSuccessToast('Sucesso!', 'Logout realizado com sucesso.')
    },
    onError: async error => {
      handleMutationError(error, 'Erro inesperado durante o logout')
      // Even with error, the logout is done anyway
      handleLogout()
    }
  })

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLoggingIn,
        isLoggingOut,
        isAuthenticated,
        login,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }

  return context
}

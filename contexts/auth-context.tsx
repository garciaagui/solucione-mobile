import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

import { handleMutationError } from '@/functions/error'
import {
  getUserFromStorage,
  removeUserFromStorage,
  saveUserToStorage
} from '@/functions/storage'
import { showErrorToast, showSuccessToast } from '@/functions/toast'
import {
  getMe as getMeService,
  login as loginService,
  logout as logoutService
} from '@/services/auth'
import { CustomAxiosError } from '@/types/api'
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

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true)

      const storedUser = await getUserFromStorage()
      setUser(storedUser)

      if (storedUser) await getMe()

      setIsLoading(false)
    }

    loadInitialData()
  }, [])

  const handleLogout = () => {
    setUser(null)
    removeUserFromStorage()
    router.replace('/')
  }

  const { mutateAsync: getMe } = useMutation({
    mutationFn: () => {
      const response = getMeService()
      return response
    },
    onSuccess: async ({ user }) => {
      setUser(user)
      saveUserToStorage(user)
    },
    onError: error => {
      const axiosError = error as CustomAxiosError

      if (axiosError.response?.status === 401) {
        showErrorToast('Erro', 'Sessão expirada. Faça login novamente.')
      } else {
        handleMutationError(
          error,
          'Erro inesperado durante a verificação de autenticação.'
        )
      }

      handleLogout()
    }
  })

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: (credentials: LoginRequest) => {
      const response = loginService(credentials)
      return response
    },
    onSuccess: async ({ user }) => {
      setUser(user)
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

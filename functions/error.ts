import { CustomAxiosError } from '@/types/api'

import { showErrorToast } from './toast'

export const handleMutationError = (
  error: Error,
  customMessage = 'Erro inesperado'
) => {
  const axiosError = error as CustomAxiosError
  const message = axiosError.response?.data.message || customMessage

  showErrorToast('Erro', message)
}

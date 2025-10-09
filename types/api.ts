import { AxiosError } from 'axios'

interface CustomApiErrorResponse {
  message: string
}

export type CustomAxiosError = AxiosError<CustomApiErrorResponse>

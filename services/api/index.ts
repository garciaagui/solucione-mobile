import axios from 'axios'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL

if (!BASE_URL) {
  throw new Error('API URL is not defined.')
}

const api = axios.create({
  baseURL: BASE_URL
})

export default api

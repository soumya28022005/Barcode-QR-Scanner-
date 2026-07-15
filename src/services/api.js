import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Let 409 (Conflict) pass through so UI can handle "Already Served" specifically
    if (error.response?.status === 409) {
      return Promise.reject(error)
    }
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong. Please try again.'
    return Promise.reject({ ...error, message })
  }
)

export const verifyQrCode = (token) => {
  return apiClient.get(`/students/by-token/${token}`).then((res) => res.data)
}

export const submitFoodSelection = (payload) => {
  return apiClient.post('/submit', payload).then((res) => res.data)
}

export const searchByEmail = (email) => {
  return apiClient.get('/students/search', { params: { email } }).then((res) => res.data)
}

export const fetchDashboard = (params = {}) => {
  return apiClient.get('/dashboard', { params }).then((res) => res.data)
}

export default apiClient
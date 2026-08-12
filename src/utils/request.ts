import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'

const MAX_RETRIES = 2 
const RETRY_DELAY = 1500

interface RetryConfig extends InternalAxiosRequestConfig {
    _retryCount?: number
}

const request = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000
})

request.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

request.interceptors.response.use(
    (res) => res.data,
    async (err: AxiosError) => {
        console.error(err.response?.data || err.message)

        const config =  err.config as RetryConfig | undefined

        if (!config) {
            return Promise.reject(err)
        }

        const retryCount = config._retryCount ?? 0

        // Retry 2 times
        if (retryCount >= MAX_RETRIES) {
            return Promise.reject(err)  
        }

        config._retryCount = retryCount + 1

        await new Promise((resolve) => {
            setTimeout(resolve, RETRY_DELAY)
        })

        return request(config)
    }
)

export default request
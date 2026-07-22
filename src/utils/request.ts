import axios from 'axios'

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
    (err) => {
        console.error(err.response?.data || err.message)
        return Promise.reject(err)  
    }
)

export default request
import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { getToken } from './cookie'
import type { Data } from '@/types/request'

const service = axios.create({
  baseURL: 'https://api-hmzs.itheima.net/v1',
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const token = getToken()
    // if (token) {
    config.headers.Authorization =
      'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjQwMThkM2UwLWJmNzctNDVmYy1hMzY5LTFiOTRkM2U4OWM4ZCJ9.GZhc6kwDpSUN6ZzSlQ5P9N3gBS8YWMhVkyOfmVnaZ3OoLc67-4NfwTwqNrMLw9LhP3fgXhfwu8i9X8BV0jMxeQ'
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (res: AxiosResponse) => {
    return res.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

const request = <T>(url: string, method: Method, submitData?: object) => {
  return service.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export default request

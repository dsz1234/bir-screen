import Cookies from 'js-cookie'

const TOKEN_KEY = 'token_key'

// 设置token
export const setToken = (value: string) => {
  Cookies.set(TOKEN_KEY, value)
}

// 获取token
export const getToken = () => {
  return Cookies.get(TOKEN_KEY)
}

// 删除token
export const removeToken = () => {
  Cookies.remove(TOKEN_KEY)
}

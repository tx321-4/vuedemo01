import Cookies from 'js-cookie'

const TokenKey = 'DianShan'

export function getToken () {
  return Cookies.getToken(TokenKey)
}
export function setToken (token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken () {
  return Cookies.remove(TokenKey)
}

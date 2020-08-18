import Cookies from 'js-cookie'

const TokenKey = 'Report-Token'
const UserSurvey = 'User-Survey'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getUserSurvey() {
  return Cookies.get(UserSurvey)
}

export function setUserSurvey(data) {
  return Cookies.set(UserSurvey, data)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

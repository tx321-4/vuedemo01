
import api from '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/token'
const getState = () => {
  return {
    token: getToken()
  }
}
const user = {
  state: {
    ...getState
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        api.login(user.username, user.password, user.verifycode).then(res => {
          commit('SET_TOKEN', res.token)
          setToken(res.token)
          resolve(res)
        }).catch(error => reject(error))
      })
    },
    logout ({ commit }) {
      removeToken()
    }
  }
}
export default user

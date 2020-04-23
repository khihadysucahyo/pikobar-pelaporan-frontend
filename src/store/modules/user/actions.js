import requestServer from '@/api'
import { setToken, removeToken } from '@/utils/cookies'
import { resetRouter } from '@/router'

export default {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      requestServer('/api/login', 'POST', userInfo).then((response) => {
        const { token } = response.data
        commit('SET_TOKEN', token)
        setToken(token)
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      requestServer('/api/users/info', 'GET').then(async(response) => {
        const { role, fullname, code_district_city } = response.data
        const data = {
          roles: [role]
        }
        const district = await requestServer(`/api/areas/district-city?kota_kode=${code_district_city}`, 'GET')
        const { roles } = data
        commit('SET_ROLES', roles)
        commit('SET_DISTRICT', code_district_city)
        commit('SET_FULLNAME', fullname)
        if (district.data[0]) commit('SET_DISTRICT_NAME', district.data[0].kota_nama)
        resolve(roles)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  async changePasswordUser({ commit }, data) {
    try {
      const response = await requestServer('/api/users/change-password', 'PUT', data)
      return response
    } catch (e) {
      return e
    }
  },

  async createUser({ commit }, data) {
    try {
      const response = await requestServer('/api/users', 'POST', data)
      return response
    } catch (e) {
      return e
    }
  },

  async editUser({ commit }, data) {
    const id = await data.id
    await delete data['id']
    try {
      const response = await requestServer(`/api/users/${id}`, 'PUT', data.data)
      return response
    } catch (e) {
      return e
    }
  },

  async listUser({ commit }, params) {
    try {
      const response = await requestServer('/api/users', 'GET', params)
      if (response.data === null) {
        commit('SET_TOTAL_LIST_USER', 1)
        commit('SET_LIST_USER', [])
      } else {
        commit('SET_TOTAL_LIST_USER', response.data._meta.totalPages)
        commit('SET_LIST_USER', response.data.users)
      }
      return response
    } catch (e) {
      return e
    }
  },

  async detailUser({ commit }, id) {
    try {
      const response = await requestServer(`/api/users/${id}`, 'GET')
      return response
    } catch (e) {
      return e
    }
  },

  async deleteUser({ commit }, id) {
    try {
      const response = await requestServer(`/api/users/${id}`, 'DELETE')
      return response
    } catch (error) {
      return error.response
    }
  },

  async checkUsernameEmail({ commit }, params) {
    try {
      const response = await requestServer('/api/users/check', 'GET', params)
      return response
    } catch (e) {
      return e
    }
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_DISTRICT', [])
      removeToken()
      resetRouter()

      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

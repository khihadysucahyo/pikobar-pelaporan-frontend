import requestServer from '@/api'
import request from '@/utils/request'

export default {
  async listReportCase({ commit }, params) {
    try {
      const response = await requestServer('/api/cases', 'GET', params)
      if (response.data === null) {
        commit('SET_TOTAL_LIST_PASIEN', 1)
        commit('SET_LIST_PASIEN', [])
      } else {
        commit('SET_TOTAL_LIST_PASIEN', response.data._meta.totalPages)
        commit('SET_LIST_PASIEN', response.data.cases)
      }
      return response
    } catch (error) {
      return error.response
    }
  },
  async createReportCase({ commit }, data) {
    try {
      const response = await requestServer('/api/cases', 'POST', data)
      return response
    } catch (error) {
      return error.response
    }
  },
  async updateReportCase({ commit }, data) {
    const id_case = await data.id
    await delete data['id']
    try {
      const response = await requestServer(`/api/cases/${id_case}`, 'PUT', data.data)
      return response
    } catch (error) {
      return error.response
    }
  },
  async detailReportCase({ commit }, id) {
    try {
      const response = await requestServer(`/api/cases/${id}`, 'GET')
      return response
    } catch (error) {
      return error.response
    }
  },
  async deleteReportCase({ commit }, id) {
    try {
      const response = await requestServer(`/api/cases/${id}`, 'DELETE')
      return response
    } catch (error) {
      return error.response
    }
  },
  async detailHistoryCase({ commit }, id) {
    try {
      const response = await requestServer(`/api/cases/${id}/last-history`, 'GET')
      return response.data[0]
    } catch (error) {
      return error.response
    }
  },
  async countReportCase({ commit }, params) {
    try {
      const response = await requestServer('/api/cases-summary', 'GET', params)
      return response
    } catch (e) {
      return e
    }
  },
  async countReportCaseFinal({ commit }, params) {
    try {
      const response = await requestServer('/api/cases-summary-final', 'GET', params)
      return response
    } catch (e) {
      return e
    }
  },
  async listHistoryCase({ commit }, id) {
    try {
      const response = await requestServer(`/api/cases/${id}/history`, 'GET')
      return response
    } catch (error) {
      return error.response
    }
  },
  async createHistoryCase({ commit }, data) {
    try {
      const response = await requestServer('/api/history_cases', 'POST', data)
      return response
    } catch (error) {
      return error.response
    }
  },
  async exportExcel({ commit }, params) {
    try {
      const response = await request({
        url: `/api/cases-export`,
        method: 'GET',
        params: params,
        responseType: 'blob'
      })
      return response
    } catch (error) {
      return error.response
    }
  },
  resetListCase({ commit }) {
    commit('RESET_LIST_CASE')
  },
  resetFormPasien({ commit }) {
    commit('RESET_FORM_PASIEN')
  },
  resetRiwayatFormPasien({ commit }) {
    commit('RESET_RIWAYAT_FORM_PASIEN')
  }
}

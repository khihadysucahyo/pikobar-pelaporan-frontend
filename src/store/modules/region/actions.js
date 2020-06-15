import requestServer from '@/api'

export default {
  async getListDistrictCity({ commit }) {
    try {
      const response = await requestServer('/api/areas/district-city', 'GET')
      commit('SET_DISTRICT_CITY', response.data)
      return response
    } catch (e) {
      return e
    }
  },
  async getDetailDistrict({ commit }, codeDistrict) {
    try {
      const response = await requestServer(`/api/areas/district-city?kota_kode=${codeDistrict}`, 'GET')
      return response
    } catch (e) {
      return e
    }
  },
  async getListSubDistrict({ commit }, codeDistrict) {
    try {
      const response = await requestServer(`/api/areas/sub-district/${codeDistrict}`, 'GET')
      return response
    } catch (e) {
      return e
    }
  },
  async getListVillage({ commit }, codeSubDistrict) {
    try {
      const response = await requestServer(`/api/areas/village/${codeSubDistrict}`, 'GET')
      return response
    } catch (e) {
      return e
    }
  },
  async getListHospital({ commit }, params) {
    try {
      const response = await requestServer('/api/areas/hospital', 'GET', params)
      commit('SET_HOSPITAL_CITY', response.data)
      return response
    } catch (e) {
      return e
    }
  },
  async listCountry({ commit }) {
    try {
      const response = await requestServer(`/api/country`, 'GET')
      return response
    } catch (e) {
      return e
    }
  },
  async listUnit({ commit }, params) {
    try {
      const response = await requestServer(`/api/unit`, 'GET', params)
      return response
    } catch (e) {
      return e
    }
  },
  async detailUnit({ commit }, id) {
    try {
      const response = await requestServer(`/api/unit/${id}`, 'GET')
      return response
    } catch (e) {
      return e
    }
  }
}

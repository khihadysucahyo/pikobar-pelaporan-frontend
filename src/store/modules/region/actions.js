import requestServer from '@/api'

export default {
  async getListDistrictCity({ commit }) {
    try {
      const response = await requestServer('/api/areas/district-city', 'GET')
      commit('SET_DISTRICT_CITY', response.data)
      return response
    } catch (error) {
      return error.response
    }
  },
  async getDetailDistrict({ commit }, codeDistrict) {
    try {
      const response = await requestServer(`/api/areas/district-city?kota_kode=${codeDistrict}`, 'GET')
      return response
    } catch (error) {
      return error.response
    }
  },
  async getDetailSubDistrict({ commit }, codeSubDistrict) {
    try {
      const response = await requestServer(`/api/areas/sub-district-detail/${codeSubDistrict}`, 'GET')
      return response
    } catch (error) {
      return error.response
    }
  },
  async getDetailVillage({ commit }, codeVillage) {
    try {
      const response = await requestServer(`/api/areas/village-detail/${codeVillage}`, 'GET')
      return response
    } catch (error) {
      return error.response
    }
  },
  async getListSubDistrict({ commit }, codeDistrict) {
    try {
      const response = await requestServer(`/api/areas/sub-district/${codeDistrict}`, 'GET')
      return response
    } catch (error) {
      return error.response
    }
  },
  async getListVillage({ commit }, codeSubDistrict) {
    try {
      const response = await requestServer(`/api/areas/village/${codeSubDistrict}`, 'GET')
      return response
    } catch (error) {
      return error.response
    }
  },
  async getListHospital({ commit }, params) {
    try {
      const response = await requestServer('/api/areas/hospital', 'GET', params)
      commit('SET_HOSPITAL_CITY', response.data)
      return response
    } catch (error) {
      return error.response
    }
  },
  async listCountry({ commit }) {
    try {
      const response = await requestServer(`/api/country`, 'GET')
      return response
    } catch (error) {
      return error.response
    }
  },
  async listUnit({ commit }, params) {
    try {
      const response = await requestServer(`/api/unit`, 'GET', params)
      return response
    } catch (error) {
      return error.response
    }
  },
  async detailUnit({ commit }, id) {
    try {
      const response = await requestServer(`/api/unit/${id}`, 'GET')
      return response
    } catch (error) {
      return error.response
    }
  }
}

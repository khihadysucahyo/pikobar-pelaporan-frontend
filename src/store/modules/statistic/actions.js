import requestServer from '@/api'

export default {
  async countAgeGender({ commit }, params) {
    try {
      const response = await requestServer('/api/dashboard/chart-age-gender', 'GET', params)
      return response
    } catch (error) {
      return error.response
    }
  }
}

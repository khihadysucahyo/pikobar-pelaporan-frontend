import requestServer from '@/api'

export default {
  async countAgeGender({
    commit
  }, params) {
    try {
      const response = await requestServer('/api/dashboard/chart-age-gender', 'GET', params)
      return response
    } catch (error) {
      return error.response
    }
  },
  async countDailyOTG({
    commit
  }, params) {
    try {
      const response = await requestServer('/api/dashboard/chart-otg', 'GET', params)
      return response
    } catch (error) {
      return error.response
    }
  },
  async countDailyODP({
    commit
  }, params) {
    try {
      const response = await requestServer('/api/dashboard/chart-odp', 'GET', params)
      return response
    } catch (error) {
      return error.response
    }
  },
  async countDailyPDP({
    commit
  }, params) {
    try {
      const response = await requestServer('/api/dashboard/chart-pdp', 'GET', params)
      return response
    } catch (error) {
      return error.response
    }
  }
}

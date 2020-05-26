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
  async countOTG({
    commit
  }, params) {
    try {
      const response = await requestServer('/api/dashboard/chart-otg', 'GET', params)
      return response
    } catch (error) {
      return error.response
    }
  },
  async countODP({
    commit
  }, params) {
    try {
      const response = await requestServer('/api/dashboard/chart-odp', 'GET', params)
      return response
    } catch (error) {
      return error.response
    }
  },
  async countPDP({
    commit
  }, params) {
    try {
      const response = await requestServer('/api/dashboard/chart-pdp', 'GET', params)
      return response
    } catch (error) {
      return error.response
    }
  },
  async countPositive({
    commit
  }, params) {
    try {
      const response = await requestServer('/api/dashboard/chart-confirm', 'GET', params)
      return response
    } catch (error) {
      return error.response
    }
  },
  async agregateCriteria({
    commit
  }, params) {
    try {
      const response = await requestServer('/api/dashboard/tabel-aggregate-criteria', 'GET', params)
      return response
    } catch (error) {
      return error.response
    }
  }
}

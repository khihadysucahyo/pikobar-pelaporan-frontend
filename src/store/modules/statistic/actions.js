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
    // try {
    //   const response = await requestServer('/api/dashboard/chart-pdp', 'GET', params)
    //   return response
    // } catch (error) {
    //   return error.response
    // }

    const result = {
      'status': 200,
      'message': 'Success',
      'data': []
    }
    result.data.push({
      'sembuh': 1,
      'meninggal': 2,
      'positif': 3,
      'total': 249,
      'date': '2020/03/23',
      'cum_sembuh': 1,
      'cum_meninggal': 2,
      'cum_positif': 3
    })
    result.data.push({
      'sembuh': 1,
      'meninggal': 2,
      'positif': 3,
      'total': 249,
      'date': '2020/03/24',
      'cum_sembuh': 2,
      'cum_meninggal': 4,
      'cum_positif': 6
    })
    return result
  }
}

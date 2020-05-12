import requestServer from '@/api'

export default {
  async createSubmissionLogistic({ commit }, data) {
    try {
      const response = await requestServer(`/api/logistics/requests`, 'POST', data)
      return response
    } catch (error) {
      return error.response
    }
  }
}

import requestServer from '@/api'

export default {
  async getListCloseContactByCase({ commit }, idCase) {
    try {
      const response = await requestServer(`/api/cases/${idCase}/close-contacts`, 'GET')
      return response
    } catch (e) {
      return e
    }
  },
  async postListCloseContactByCase({ commit }, data) {
    const {
      idCase,
      body
    } = data
    try {
      const response = await requestServer(`/api/cases/${idCase}/close-contacts`, 'POST', body)
      return response
    } catch (e) {
      return e
    }
  }
}

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
  async getDetailCloseContactByCase({ commit }, data) {
    const {
      idCase,
      idCloseContact
    } = data
    try {
      const response = await requestServer(`/api/cases/${idCase}/close-contacts/${idCloseContact}`, 'GET')
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
  },
  async updateDetailCloseContactByCase({ commit }, data) {
    const {
      idCase,
      idCloseContact,
      body
    } = data
    try {
      const response = await requestServer(`/api/cases/${idCase}/close-contacts/${idCloseContact}`, 'PUT', body)
      return response
    } catch (e) {
      return e
    }
  }
}

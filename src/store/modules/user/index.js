import actions from './actions'
import mutations from './mutations'
import getters from './getters'

import { getToken } from '@/utils/cookies'

const state = {
  token: getToken(),
  roles: [],
  district_user: '',
  user_district_name: '',
  fullname: ''
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

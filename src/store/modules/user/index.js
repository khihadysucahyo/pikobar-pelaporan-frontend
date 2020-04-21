import actions from './actions'
import mutations from './mutations'
import getters from './getters'

import { getToken } from '@/utils/cookies'

const state = {
  token: getToken(),
  roles: [],
  district_user: '',
  user_district_name: '',
  fullname: '',
  formUser: {
    username: '',
    password: '',
    email: '',
    role: '',
    code_district_city: '',
    name_district_city: '',
    code_sudistrict: '',
    name_subdistrict: '',
    code_village: '',
    name_village: '',
    fullname: '',
    phone_number: '',
    name_instansi: ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

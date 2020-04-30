import actions from './actions'
import mutations from './mutations'
import getters from './getters'

import { getToken } from '@/utils/cookies'

const state = {
  token: getToken(),
  roles: [],
  district_user: '',
  user_district_name: '',
  fullName: '',
  totalList: 0,
  userList: [],
  formUser: {
    username: '',
    password: '',
    email: '',
    role: '',
    code_district_city: '',
    name_district_city: '',
    address_subdistrict_code: '',
    address_subdistrict_name: '',
    address_village_code: '',
    address_village_name: '',
    address_street: '',
    fullName: '',
    phone_number: ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

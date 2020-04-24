export default {
  roles: (state, getters) => {
    return state.roles
  },
  token: (state, getters) => {
    return state.token
  },
  district_user: (state, getters) => {
    return state.district_user
  },
  district_name_user: (state, getters) => {
    return state.user_district_name
  },
  fullname: (state, getters) => {
    return state.fullname
  },
  formUser: (state, getters) => {
    return state.formUser
  },
  totalList: (state, getters) => {
    return state.totalList
  },
  userList: (state, getters) => {
    return state.userList
  }
}

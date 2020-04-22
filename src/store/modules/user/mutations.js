export default {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_DISTRICT: (state, district) => {
    state.district_user = district
  },
  SET_DISTRICT_NAME: (state, districtName) => {
    state.user_district_name = districtName
  },
  SET_FULLNAME: (state, fullname) => {
    state.fullname = fullname
  },
  SET_LIST_USER: (state, data) => {
    state.userList = data
  },
  SET_TOTAL_LIST_USER: (state, data) => {
    state.totalList = data
  }
}

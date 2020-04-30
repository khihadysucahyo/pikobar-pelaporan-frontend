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
  SET_FULLNAME: (state, fullName) => {
    state.fullName = fullName
  },
  SET_LIST_USER: (state, data) => {
    state.userList = data
  },
  SET_TOTAL_LIST_USER: (state, data) => {
    state.totalList = data
  },
  RESET_FORM_USER: (state) => {
    state.formUser.username = ''
    state.formUser.password = ''
    state.formUser.email = ''
    state.formUser.role = ''
    state.formUser.code_district_city = ''
    state.formUser.name_district_city = ''
    state.formUser.address_subdistrict_code = ''
    state.formUser.address_subdistrict_name = ''
    state.formUser.address_village_code = ''
    state.formUser.address_village_name = ''
    state.formUser.address_street = ''
    state.formUser.fullName = ''
    state.formUser.phone_number = ''
  }
}

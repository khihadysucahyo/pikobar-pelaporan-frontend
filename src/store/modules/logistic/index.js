import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  faskesTypeList: [],
  listAPD: [],
  listApdUnit: []
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

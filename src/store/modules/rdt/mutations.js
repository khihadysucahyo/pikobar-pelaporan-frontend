export default {
  SET_LIST_RDT: (state, data) => {
    state.listRDT = data
  },
  SET_TOTAL_PAGE_LIST_RDT: (state, data) => {
    state.totalList = data
  },
  SET_TOTAL_RDT: (state, data) => {
    state.totalDataRDT = data
  },
  SET_LIST_TARGET: (state, data) => {
    state.listTarget = data
  },
  RESET_LIST_RDT: (state, data) => {
    state.listRDT = []
  }
}

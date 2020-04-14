export default {
  setLoading({ commit }, newLoading) {
    return new Promise(resolve => {
      commit('SET_LOADING', newLoading)
      resolve()
    })
  }
}

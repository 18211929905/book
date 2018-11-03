const book = {
  state:{
    book:1
  },
  mutations:{
    'SET_BOOK':(state,newstate) => {
      state.book = newstate
    }
  },
  actions:{
    settest:({commit},newstate) => {
     return commit('SET_BOOK',newstate)
    }
  }
}
export default book
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser (state, data) {
      state.user = data;
      sessionStorage.setItem('current-user', JSON.stringify(state.user))
    },

  },
  actions: {
   setUser (context, data) {
      context.commit('setUser', data)
    },
  },
  modules: {
  }
})

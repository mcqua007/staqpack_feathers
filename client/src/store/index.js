import Vue from 'vue'
import Vuex from 'vuex'
import feathersClient from '../../feathers-client-config.js'
import router from '../router'

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
    destroyUser(state){
       state.user = null;
       sessionStorage.removeItem('current-user')
    },

  },
  actions: {
  //  setUser (context, data) {
  //     context.commit('setUser', data);
  //   },
    authenticateUser(context, data){
      console.log(data);
     feathersClient.authenticate(data)
     .then((res) => {
        // Logged in
        console.log(res);
        context.commit('setUser', res.user);
        router.push({name: 'Main'}) //once logged route to login
      }).catch(e => {
        console.error('Authentication error', e);
      });
    }
  },
  getters: {
    getUser(state){
      return state.user;
    }
  },
  modules: {
  }
})

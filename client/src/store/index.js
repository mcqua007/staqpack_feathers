import Vue from 'vue'
import Vuex from 'vuex'
import feathersClient from '@/feathers-client-config.js'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isLoggedIn: false,
    projectFormVisible: false,
    sideBarVisible: false,
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
    toggleProjectForm (state, formState) {
      state.projectFormVisible = !formState
    },
    toggleSideBar (state, sideBarState) {
      state.sideBarVisible = !sideBarState
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
    },
    authenticate(context){
      return new Promise((resolve, reject) => {
      feathersClient.reAuthenticate().then((res) => {
       console.log("auth res", res);
       context.commit('setUser', res.user);
       resolve();
     }).catch((e) => {
       // show login page
            console.error('Authentication error', e);
        reject();
     });
      })
    }
  },
  getters: {
    getUser(state){
      return state.user;
    },
    projectFormState (state) {
      return state.projectFormVisible
    },
    sideBarState (state) {
      return state.sideBarVisible
    }
  },
  modules: {
  }
})

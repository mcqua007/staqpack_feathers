import Vue from 'vue'
import Vuex from 'vuex'
import feathersClient from '@/feathers-client-config.js'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
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
    // hideProjectForm(state){

    // }

  },
  actions: {
   logout(context) {
      feathersClient.logout();
      context.commit('destroyUser');
      router.push({name: 'Home'}); //once logged out
    },
    login(context, data){
     feathersClient.authenticate(data)
     .then((res) => {
        // Logged in
        context.commit('setUser', res.user);
        router.push({name: 'Main'}) //once logged route to login
      }).catch(e => {
        console.error('Authentication error', e);
      });
    },
    authenticate(context){
      return new Promise((resolve, reject) => {
      feathersClient.reAuthenticate().then((res) => {
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

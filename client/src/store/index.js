import Vue from 'vue'
import Vuex from 'vuex'
import feathersClient from '@/feathers-client-config.js'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    projects: null,
    projectFormVisible: false,
    taskFormVisible: false,
    sideBarVisible: false,
    projectVisible: false,
    loading: true,
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
    setProjects(state, data){
      state.projects = data;
    },
    toggleProjectForm (state, formState) {
      state.projectFormVisible = !formState
    },
    toggleTaskForm (state, formState) {
      state.taskFormVisible = !formState
    },
    hideAllForms(state){
      state.taskFormVisible = false;
      state.projectFormVisible = false;
      //state.teamFormVisible = false;
    },
    toggleSideBar (state, sideBarState) {
      state.sideBarVisible = !sideBarState
    },
    toggleProjectState(state, projectState){
      state.projectVisible = !projectState;
    },
    setLoading(state, appLoadState){
      state.loading = appLoadState;
    }

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
        reject(e);
     });
    })
   },
   fetchProjects(context, query){
     return new Promise((resolve, reject) =>{
      feathersClient.service('projects').find(query).then((res) =>{
          console.log("Veux - Fetch Projects", res);
          context.commit('setProjects', res);
          resolve(res);
      }).catch((e) =>{
         console.error('Feath Projects error', e);
        reject(e);
      });
     });
   }
  },
  getters: {
    getUser(state){
      return state.user;
    },
    projectFormState (state) {
      return state.projectFormVisible
    },
    taskFormState (state) {
      return state.taskFormVisible
    },
    sideBarState (state) {
      return state.sideBarVisible
    },
    getProjects(state){
      return state.projects;
    },
    projectState(state){
      return state.projectVisible;
    },
    loadingState(state){
      return state.loading;
    }
  },
  modules: {
  }
})

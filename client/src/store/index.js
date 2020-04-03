import Vue from 'vue'
import Vuex from 'vuex'
import feathersClient from '@/feathers-client-config.js'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    projects: null,
    currentProject: null,
    currentProjectTasks: null,
    currentProjectName: null,
    currentProjectId: null,
    projectFormVisible: false,
    taskFormVisible: false,
    sideBarVisible: false,
    projectVisible: false,
    loading: true,
    loadingTasks: null,
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
         console.error('FetchProjects error', e);
        reject(e);
      });
    });
   },
   fetchCurrentProjectTasks(context, query){
     return new Promise((resolve, reject) =>{
     context.commit('setTasksLoading', true);
      feathersClient.service('tasks').find(query).then((res) =>{
          console.log("Veux - Fetch currentProjectTasks", res);
          context.commit('setCurrentProjectTasks', res);
          resolve(res);
          context.commit('setTasksLoading', false);
      }).catch((e) =>{
         console.error('FeathCurrentProjectTasks error', e);
        reject(e);
      });
    });
   }
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
    setCurrentProject(state, data){
      state.currentProject = data;
      state.currentProjectId= data.id;
      state.currentProjectName= data.name;
    },
    destroyCurrentProject(state){
      state.currentProject = null;
    },
    setCurrentProjectTasks(state, data){
      state.currentProjectTasks = data
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
    },
    setTasksLoading(state, loadState){
      state.loadingTasks = loadState;
    }

  },
  getters: {
    user(state){
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
    projects(state){
      return state.projects;
    },
    projectState(state){
      return state.projectVisible;
    },
    loadingState(state){
      return state.loading
    },
    currentProject(state){
      return state.currentProject
    },
    currentProjectId(state){
      return state.currentProjectId
    },
    currentProjectName(state){
      return state.currentProjectName
    },
    currentProjectTasks(state){
      return state.currentProjectTasks
    },
    tasksLoadingState(state){
      return state.loadingTasks
    }
  },
  modules: {
  }
})

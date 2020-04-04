import Vue from 'vue'
import Vuex from 'vuex'
import feathersClient from '@/feathers-client-config.js'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    debug: true,
    user: null,
    projects: null,
    currentProject: null,
    currentProjectTasks: null,
    currentProjectName: null,
    currentProjectId: null,
    projectFormVisible: false,
    taskFormVisible: false,
    sideBarVisible: false,
    settingsVisible: false,
    projectVisible: false,
    loading: true,
    themeColor: localStorage.getItem('theme-color') ? localStorage.getItem('theme-color') : '#343434',
  },
  actions: {
    // Authentication Actions 
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
         if(context.state.debug) console.error('Authentication error', e);
      })
    },
    authenticate(context){
      return new Promise((resolve, reject) => {
      feathersClient.reAuthenticate().then((res) => {
       context.commit('setUser', res.user);
       resolve();
     }).catch((e) => {
       // show login page
          if(context.state.debug)  console.error('Authentication error', e);
        reject(e);
     })
    })
   },
   //Project CRUD Operations 
   fetchProjects(context, query){
     return new Promise((resolve, reject) =>{
      feathersClient.service('projects').find(query).then((res) =>{
           if(context.state.debug) console.log("Veux - Fetch Projects", res);
          context.commit('setProjects', res);
          resolve(res);
      }).catch((e) =>{
          if(context.state.debug) console.error('FetchProjects error', e);
        reject(e);
      })
    })
   },
   fetchCurrentProjectTasks(context, query){
     return new Promise((resolve, reject) =>{
      feathersClient.service('tasks').find(query).then((res) =>{
           if(context.state.debug) console.log("Veux - Fetch currentProjectTasks", res);
          context.commit('setCurrentProjectTasks', res);
          resolve(res);
      }).catch((e) =>{
          if(context.state.debug) console.error('FetchCurrentProjectTasks error', e);
        reject(e);
      })
    })
   },
    deleteProject(context, projectId){
      return new Promise((resolve, reject) =>{
      feathersClient.service('projects').remove(projectId).then((res) => {
        context.dispatch('deleteTask', {projectId: projectId}).then((taskRes) => {
          resolve({'project_msg':res, 'task_msg:': taskRes});
        });
        
      }).catch((e) =>{
        if(context.state.debug) console.error('deleteProject error', e);
        reject(e);
      })
     })
    },
    deleteTask(context, query){
     return new Promise((resolve, reject) =>{
      feathersClient.service('tasks').remove(null, {query: query}).then((res) => {
        //remove todos that have this taskID here
        resolve(res);
      }).catch((e) =>{
        if(context.state.debug) console.error('deleteTask error', e);
        reject(e);
      })
     })
    },
    fetchTodos(context, query){
     return new Promise((resolve, reject) =>{
      feathersClient.service('todo').find({query:query}).then((res) =>{
          resolve(res);
      }).catch((e) =>{
          if(context.state.debug) console.error('FetchTodos error', e);
        reject(e);
      })
    })
    },
     postTodo(context, data){
     return new Promise((resolve, reject) =>{
      feathersClient.service('todo').create(data).then((res) =>{
          resolve(res);
      }).catch((e) =>{
          if(context.state.debug) console.error('postTodos Error:', e);
        reject(e);
      })
    })
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
    toggleSettingsState(state, settingsState){
      state.settingsVisible = !settingsState;
    },
    setLoading(state, appLoadState){
      state.loading = appLoadState;
    },
    setThemeColor(state, color){
      state.themeColor = color;
      localStorage.setItem('theme-color', color);
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
    settingsState(state){
      return state.settingsVisible;
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
    themeColor(state){
      return state.themeColor
    }
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import feathersClient from '@/feathers-client-config.js'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    debug: true,
    user: null,
    projects: [],
    currentProject: null,
    currentProjectTasks: null,
    currentProjectName: null,
    currentProjectId: null,
    tasks: [],
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
   createProject(context, data){
    return new Promise((resolve, reject) =>{
     feathersClient.service('projects').create(data).then((res)=>{
        if(context.state.debug) console.log("Veux - Create Project", res);
         context.commit('addProject', res);
         resolve(res);
     }).catch((e)=>{
        if(context.state.debug) console.error('createProject error', e);
        reject(e);
     })
    })
   },
   //Get All Data For Current Project
   fetchCurrentProjectTasks(context, query){
     return new Promise((resolve, reject) =>{
      feathersClient.service('tasks').find(query).then((res) =>{
           if(context.state.debug) console.log("Veux - Fetch currentProjectTasks", res);
          context.commit('setCurrentProjectTasks', res);
          context.commit('setTasks', res);
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
          resolve({'project_msg':res, 'task_msg:': taskRes.taskRes, "todo_msg":taskRes.todoRes});
        });
        
      }).catch((e) =>{
        if(context.state.debug) console.error('deleteProject error', e);
        reject(e);
      })
     })
    },
   //Tasks CRUD Actions
   createTask(context, data){
    return new Promise((resolve, reject) =>{
     feathersClient.service('tasks').create(data).then((res)=>{
        if(context.state.debug) console.log("Veux - Create Task", res);
         context.commit('addTask', res);
         resolve(res);
     }).catch((e)=>{
        if(context.state.debug) console.error('createTask error', e);
        reject(e);
     })
    })
   },
   deleteTask(context, query){
     return new Promise((resolve, reject) =>{
      feathersClient.service('tasks').remove(null, {query: query}).then((res) => {
        //remove todos that have this taskID here
        context.dispatch('deleteTodo', {query: query}).then((todoRes) => {
          resolve({'taskRes': res, 'todoRes': todoRes});
        });
        resolve(res);
      }).catch((e) =>{
        if(context.state.debug) console.error('deleteTask error', e);
        reject(e);
      })
     })
    },
    // this todos crud 
    fetchTodos(context, query){
     return new Promise((resolve, reject) =>{
      feathersClient.service('todos').find({query:query}).then((res) =>{
          resolve(res);
      }).catch((e) =>{
          if(context.state.debug) console.error('FetchTodos error', e);
        reject(e);
      })
    })
    },
    createTodo(context, data){
     return new Promise((resolve, reject) =>{
      feathersClient.service('todos').create(data).then((res) =>{
          resolve(res);
      }).catch((e) =>{
          if(context.state.debug) console.error('createTodo Error:', e);
        reject(e);
      })
    })
   },
   deleteTodo(context, data){
     return new Promise((resolve, reject) =>{
       feathersClient.service('todos').remove(data).then((res) =>{
          resolve(res);
      }).catch((e) =>{
       if(context.state.debug) console.error('deleteTodo Error:', e);
        reject(e);
      })
     })
   },
    patchTodo(context, data){
     return new Promise((resolve, reject) =>{
      feathersClient.service('todos').patch(data.id, data.update).then((res) =>{
         resolve(res);
      }).catch((e) =>{
       if(context.state.debug) console.error('deleteTodo Error:', e);
        reject(e);
      })
     })
   }
  },
  mutations: {
    //User Mutations
    setUser (state, payload) {
      state.user = payload;
      sessionStorage.setItem('current-user', JSON.stringify(state.user))
    },
    destroyUser(state){
       state.user = null;
       sessionStorage.removeItem('current-user')
    },
    //Project Mutations
    setProjects(state, payload){
      state.projects = payload.data;
    },
    addProject(state, payload){
      state.projects.push(payload);
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
    setTasks(state, payload){
      payload.data.forEach((item)=>{
        state.tasks[item._id]= item;
      });
      console.log('Tasks: ', state.tasks);
    },
    addTask(state, payload){
      state.tasks.push(payload);
    },
    //State/Visibility Mutations
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
    //Settings Mutations 
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

import Vue from "vue";
import Vuex from "vuex";
import feathersClient from "@/feathers-client-config.js";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    debug: true,
    user: null,
    projects: [],
    // currentProject: null,
    // currentProjectTasks: null,
    // currentProjectTodos: null,
    // currentProjectName: null,
    // currentProjectId: null,
    // currentTaskTodos: null,
    todos: [],
    tasks: [], //being used by fetchCurrent Proejct and appends each task by id
    allTasks: [],
    projectFormVisible: false,
    taskFormVisible: false,
    sideBarVisible: false,
    loading: true,
    themeColor: localStorage.getItem("theme-color") ?
      localStorage.getItem("theme-color") : "#343434",
    // currentProjectData: null,
  },
  actions: {
    // Authentication Actions
    logout(context) {
      feathersClient.logout();
      context.commit("destroyUser");
      router.push({
        name: 'Home',
      }); //once logged out
    },
    login(context, data) {
      feathersClient
        .authenticate(data)
        .then((res) => {
          // Logged in
          context.commit("setUser", res.user);
          router.push({
            name: "AllTasks",
          }); //once logged route to login
        })
        .catch((e) => {
          if (context.state.debug) console.error("Authentication error", e);
        });
    },
    authenticate(context) {
      return new Promise((resolve, reject) => {
        feathersClient
          .reAuthenticate()
          .then((res) => {
            context.commit("setUser", res.user);
            resolve();
          })
          .catch((e) => {
            // show login page
            if (context.state.debug) console.error("Authentication error", e);
            reject(e);
          });
      });
    },
    //Project CRUD Operations
    fetchProjects(context, query) {
      return new Promise((resolve, reject) => {
        feathersClient
          .service("projects")
          .find(query)
          .then((res) => {
            if (context.state.debug) console.log("Veux - Fetch Projects", res);
            context.commit("setProjects", res);
            resolve(res);
          })
          .catch((e) => {
            if (context.state.debug) console.error("FetchProjects error", e);
            reject(e);
          });
      });
    },
    createProject(context, data) {
      return new Promise((resolve, reject) => {
        feathersClient
          .service("projects")
          .create(data)
          .then((res) => {
            if (context.state.debug) console.log("Veux - Create Project", res);
            context.commit("addProject", res);
            resolve(res);
          })
          .catch((e) => {
            if (context.state.debug) console.error("createProject error", e);
            reject(e);
          });
      });
    },

    deleteProject(context, projectId) {
      return new Promise((resolve, reject) => {
        feathersClient
          .service("projects")
          .remove(projectId)
          .then((res) => {
            context.commit("deleteProject", res._id); //delete project form state projects

            context
              .dispatch("deleteTasks", {
                task: {
                  id: null,
                  query: {
                    projectId: projectId,
                  },
                },
                todo: {
                  id: null,
                  query: {
                    projectId: projectId,
                  },
                },
              })
              .then((taskRes) => {
                //project has been deleted

                resolve({
                  project_msg: res,
                  "task_msg:": taskRes.taskRes,
                  todo_msg: taskRes.todoRes,
                });
              });
          })
          .catch((e) => {
            if (context.state.debug) console.error("deleteProject error", e);
            reject(e);
          });
      });
    },
    //Tasks CRUD Actions
    createTask(context, data) {
      return new Promise((resolve, reject) => {
        feathersClient
          .service("tasks")
          .create(data)
          .then((res) => {
            if (context.state.debug) console.log("Veux - Create Task", res);
            context.commit("ADD_TASKS", res);
            resolve(res);
          })
          .catch((e) => {
            if (context.state.debug) console.error("createTask error", e);
            reject(e);
          });
      });
    },
    fetchAllTasks(context, query) {
      return new Promise((resolve, reject) => {
        feathersClient
          .service("tasks")
          .find(query)
          .then((res) => {
            context.commit("setAllTasks", res);
            resolve(res);
          })
          .catch((e) => {
            if (context.state.debug) console.error("FetchTasks error", e);
            reject(e);
          });
      });
    },
    deleteTasks(context, payload) {
      return new Promise((resolve, reject) => {
        feathersClient
          .service("tasks")
          .remove(payload.task.id, {
            query: payload.task.query,
          })
          .then((res) => {
            console.log("Action: Delete Tasks Res: ", res);
            context.commit("DELETE_TASKS", res); //Mutation to delete tasks from state
            //remove todos that have this taskID here
            context.dispatch("deleteTodos", payload).then((todoRes) => {
              resolve({
                taskRes: res,
                todoRes: todoRes,
              });
            });
            resolve(res);
          })
          .catch((e) => {
            if (context.state.debug) console.error("deleteTasks error", e);
            reject(e);
          });
      });
    },
    // this todos crud
    fetchTodos(context, query) {
      return new Promise((resolve, reject) => {
        feathersClient
          .service("todos")
          .find({
            query: query,
          })
          .then((res) => {
            console.log('FetchTodos: ', res);
            resolve(res);
            context.commit('ADD_TODOS', res.data);
          })
          .catch((e) => {
            if (context.state.debug) console.error("FetchTodos error", e);
            reject(e);
          });
      });
    },
    createTodo(context, data) {
      return new Promise((resolve, reject) => {
        feathersClient
          .service("todos")
          .create(data)
          .then((res) => {
            resolve(res);
          })
          .catch((e) => {
            if (context.state.debug) console.error("createTodo Error:", e);
            reject(e);
          });
      });
    },
    deleteTodos(context, payload) {
      return new Promise((resolve, reject) => {
        feathersClient
          .service("todos")
          .remove(payload.todo.id, {
            query: payload.todo.query,
          })
          .then((res) => {
            console.log("Action - deleteTodos Res:", res);
            resolve(res);
          })
          .catch((e) => {
            if (context.state.debug) console.error("deleteTodo Error:", e);
            reject(e);
          });
      });
    },

    patchTodo(context, data) {
      return new Promise((resolve, reject) => {
        feathersClient
          .service("todos")
          .patch(data.id, data.update)
          .then((res) => {
            resolve(res);
          })
          .catch((e) => {
            if (context.state.debug) console.error("deleteTodo Error:", e);
            reject(e);
          });
      });
    },
    //Trying Something - aleady have some action s that od htis
    getAllCurrentProjectData({
      commit
    }, projectId) {
      commit("filterCurrentProjectTasks", projectId);
      commit("filterCurrentProjectData", projectId);

    }
  },
  mutations: {
    //User Mutations
    setUser(state, payload) {
      state.user = payload;
      sessionStorage.setItem("current-user", JSON.stringify(state.user));
    },
    destroyUser(state) {
      state.user = null;
      sessionStorage.removeItem("current-user");
    },
    //Project Mutations
    setProjects(state, payload) {
      state.projects = payload.data;
    },
    addProject(state, payload) {
      state.projects.push(payload);
    },
    deleteProject(state, projectId) {
      let index = state.projects.findIndex((project) => project._id == projectId);
      state.projects.splice(index, 1);
    },
    setCurrentProject(state, data) {
      state.currentProject = data;
      state.currentProjectId = data.id;
      state.currentProjectName = data.name;
    },
    destroyCurrentProject(state) {
      state.currentProject = null;
    },
    //Task Mutations

    //trying to filter current project here rather then grab from server
    filterCurrentProjectTasks(state, projectId) {
      state.currentProjectTasks = state.allTasks.filter((task) => task.projectId == projectId);
    },
    // filterCurrentTaskTodos(state, taskId) {
    //   state.currentTaskTodos = state.allTodos.filter((todo) => todo.taskId == taskId);
    // },
    ADD_TASKS(state, payload) {
      //if multiple tasks or if just one add differently
      if (Array.isArray(payload)) {
        payload.forEach((item) => {
          state.tasks.push(item);
        });
      } else {
        state.tasks.push(payload);
      }
    },
    setProjectTasks(state, payload) {
      state.proejctTasks = payload.data;
    },
    setAllTasks(state, payload) {
      state.allTasks = payload.data;
    },
    DELETE_TASKS(state, taskData) {
      //Eventually remove all tasks and jsut use tasks for everythign so there is one source of truth
      if (Array.isArray(taskData)) {
        taskData.forEach(function (item) {
          //delte form state.tasks
          let index = state.tasks.findIndex((task) => task._id == item._id); //goes through all removed tasks and delete each one by id
          state.tasks.splice(index, 1);
          //delete from state.AllTasks
          let i = state.allTasks.findIndex((task) => task._id == item._id); //goes through all removed tasks and delete each one by id
          state.allTasks.splice(i, 1);
        });
      } else {
        //delte form state.tasks
        let index = state.tasks.findIndex((task) => task._id == taskData._id); //goes through all removed tasks and delete each one by id
        state.tasks.splice(index, 1);
        //delete from state.AllTasks
        let i = state.allTasks.findIndex((task) => task._id == taskData._id); //goes through all removed tasks and delete each one by id
        state.allTasks.splice(i, 1);
      }
    },

    // 'todos' mutations
    ADD_TODOS(state, payload) {
      if (Array.isArray(payload)) {
        payload.forEach((item) => {
          state.todos.push(item);
        });
      } else {
        state.todos.push(payload);
      }
    },
    //============================
    //State/Visibility Mutations
    //============================
    toggleProjectForm(state, formState) {
      state.projectFormVisible = !formState;
    },
    toggleTaskForm(state, formState) {
      state.taskFormVisible = !formState;
    },
    hideAllForms(state) {
      state.taskFormVisible = false;
      state.projectFormVisible = false;
      //state.teamFormVisible = false;
    },
    toggleSideBar(state, sideBarState) {
      state.sideBarVisible = !sideBarState;
    },
    // toggleProjectState(state, projectState) {
    //   state.projectVisible = !projectState;
    // },
    // toggleSettingsState(state, settingsState) {
    //   state.settingsVisible = !settingsState;
    // },
    // toggleAllTasksState(state, allTasksState) {
    //   state.allTasksVisible = !allTasksState;
    // },
    setLoading(state, appLoadState) {
      state.loading = appLoadState;
    },
    //Settings Mutations
    setThemeColor(state, color) {
      state.themeColor = color;
      localStorage.setItem("theme-color", color);
    },
    //end state visiblity mutations
    //filter project data based on project id
    // filterCurrentProjectData(state, projectId) {
    //   state.currentProjectData = state.projects.filter((project) => project._id == projectId);
    //   console.log('Filter Project Muta.', state.currentProjectData);
    //   state.currentProjectName = state.currentProjectData[0].name;

    // },
  },
  getters: {
    user(state) {
      return state.user;
    },
    projectFormState(state) {
      return state.projectFormVisible;
    },
    taskFormState(state) {
      return state.taskFormVisible;
    },
    sideBarState(state) {
      return state.sideBarVisible;
    },
    projects(state) {
      return state.projects;
    },
    projectState(state) {
      return state.projectVisible;
    },
    settingsState(state) {
      return state.settingsVisible;
    },
    allTasksState(state) {
      return state.allTasksVisible;
    },
    loadingState(state) {
      return state.loading;
    },
    currentProject(state) {
      return state.currentProject;
    },
    currentProjectId(state) {
      return state.currentProjectId;
    },
    currentProjectName(state) {
      return state.currentProjectName;
    },
    currentProjectTasks(state) {
      return state.currentProjectTasks;
    },
    currentTaskTodos(state) {
      return state.currentTaskTodos;
    },
    themeColor(state) {
      return state.themeColor;
    },
    allTasks(state) {
      return state.allTasks;
    },

  },
  modules: {},
});
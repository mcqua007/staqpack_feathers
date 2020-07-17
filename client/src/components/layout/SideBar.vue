<template lang="html">
  <!-- eslint-disable -->
  <div v-bind:class="{ 'sidebar-nav': true, expanded: $store.getters.sideBarState == true }">
    <nav class="text-left">
      <div class="root-nav-item" role="button" tabindex="0" @click="toggleUserMenu()">
        <i class="la la-user-circle"></i> {{ $store.getters.user.email }}
      </div>
      <div
        v-show="userMenuState"
        class="inner-menu"
        :style="{ borderTop: '2px solid ' + this.$store.getters.themeColor }"
      >
        <ul>
          <li class="m-top-8" role="button" @click="$store.dispatch('logout')">
            <i class="la la-sign-out-alt"></i> Logout
          </li>
          <li class="m-top-8" role="button" @click="toggleSettings()">
            <i class="la la-cog"></i> Settings
          </li>
          <!-- Might not do it this way if i want to go to a new page -->
          <!-- <a class="nav-link" role="link"  @click="toggleGitSettings()"> <i class="la la-github"></i>&nbsp; Git Settings</a> -->
          <!-- <router-link to="/gitsettings">Git Settings</router-link> -->
        </ul>
      </div>
      <div class="navItem">
        <div role="button" tabindex="0" @click="toggleProjectMenu()" class="root-nav-item">
          <i class="la la-folder"></i> Your Projects
        </div>
        <div
          v-show="projectMenuState"
          class="inner-menu"
          :style="{ borderTop: '2px solid ' + this.$store.getters.themeColor }"
        >
          <ul>
            <li
              role="button"
              class="m-top-8"
              v-for="project in projects"
              @click="openProject(project._id, project.name)"
            >
              <i class="las la-project-diagram"></i> {{ project.name }}
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="navItem">
           <div role="link" tabindex="0" @click="toggleTeamMenu()"  class="navItemLink link nav-link"> <i class="la la-users"></i>&nbsp; Your Teams</div>
           <div  v-show="teamMenuState" class="" id="team-menu">
             <div class="bordertop"></div>
                <div class="m-left-10">
                 <!-- For Loop for Team Names -->
      <!-- <div  v-for="team in teams" class="navItem nav-link">
                    <div role="link" tabindex="0" @click="toggleTeamProjectMenu(team.teamId)" v-bind:data-title="team.teamName" v-bind:data-id="team.teamId"  class="">{{ team.teamName }}</div>
                    <div v-show="teamProjectMenuState == true && teamId == team.teamId" v-bind:data-id="team.teamId">
                      <div class="bordertop"></div>
                         <div v-for="teamProject in teamProjects" class="m-left-10">
                           <!-- For Loop For Team Projects -->
      <!-- <div class="navItem nav-link" id="sidebar-project-wrap-">
                             <span role="link" tabindex="0" @click="openProject(teamProject.projectId, teamProject.projectName)"	 v-bind:data-id="teamProject.projectId"  class="">{{ teamProject.projectName }}</span>
                           </div>
                         </div>
                      </div>
                  </div>  
                </div>  -->
      <!-- </div>
           </div> -->
      <div class="root-nav-item">
        <div class="" role="button" @click="openAllTasks()">
          <i class="la la-tasks"></i> View All Tasks
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  /*=============================================

Notes:

team Projects - need to make the team project
not call the data each time it is clicked to
View need to call the data before hand and then
just re display it!

General - need to load a project once project
is clicked

============================================*/

  import { mapState } from "vuex";
  export default {
    name: "SideBar",
    data() {
      return {
        userMenuState: false,
        projectMenuState: false,
        projects: null,
      };
    },
    methods: {
      openAllTasks() {
        this.$store.dispatch("fetchAllTasks").then(() => {
          // this.$emit('loadAllTasks');
          // if (this.$store.getters.settingsState === true) {
          //   this.$store.commit("toggleSettingsState", this.$store.getters.settingsState);
          // }
          // //Toggle Project to True if is is not visible
          // // and the data the promise is resolve from the action
          // if (this.$store.getters.projectState === true) {
          //   this.$store.commit("toggleProjectState", this.$store.getters.projectState);
          // }
          // //Toggle AllTasks to True if is is not visible
          // // and the data the promise is resolve from the action
          // if (this.$store.getters.allTasksState === false) {
          //   this.$store.commit("toggleAllTasksState", this.$store.getters.allTasksState);
          // }
          this.$router.push({
            name: "AllTasks",
          });
        });
      },
      toggleSettings() {
        //Toggle Project to true if is is not visible
        // if (this.$store.getters.projectState === true) {
        //   this.$store.commit("toggleProjectState", this.$store.getters.projectState);
        // }
        // if (this.$store.getters.allTasksState === true) {
        //   this.$store.commit("toggleAllTasksState", this.$store.getters.allTasksState);
        // }
        // //Toggle git settings
        // this.$store.commit("toggleSettingsState", this.$store.getters.settingsState);
        this.$router.push({
          name: "Settings",
        });
      },
      toggleUserMenu() {
        this.userMenuState = !this.userMenuState;
      },
      toggleProjectMenu() {
        this.projectMenuState = !this.projectMenuState;
      },
      openProject(projectId, projectName) {
        // this.$store.commit("setCurrentProject", {
        //   id: projectId,
        //   name: projectName,
        // });

        //trying to get current project Tasks wihtout calling the server each time, them from allTasks:
        //below was here to filter out the correct projects
        //this.$store.commit("filterCurrentProjectTasks", projectId);

        // if (this.$store.getters.settingsState === true) {
        //   this.$store.commit("toggleSettingsState", this.$store.getters.settingsState);
        // }
        // //Toggle AllTasks to True if is is not visible
        // // and the data the promise is resolve from the action
        // if (this.$store.getters.allTasksState === true) {
        //   this.$store.commit("toggleAllTasksState", this.$store.getters.allTasksState);
        // }
        // //Toggle Project to True if is is not visible
        // // and the data the promise is resolve from the action
        // if (this.$store.getters.projectState === false) {
        //   this.$store.commit("toggleProjectState", this.$store.getters.projectState);
        // }

        this.$router.push({
          params: { id: projectId, name: projectName },
          name: "Project", //normally would be project but testing reloading
        });
      },
    },
    computed: mapState(["loading"]),
    watch: {
      loading(newValue, oldValue) {
        console.log(`Updating from ${oldValue} to ${newValue}`);
        if (newValue === false) {
          this.projects = this.$store.getters.projects;
          console.log("task- projects watch", this.projects);
        }
      },
    },
    created() {},
    mounted() {},
  };
</script>

<style lang="css" scoped>
  .menu-animation {
    transition: transform 0.3192s cubic-bezier(0, 0, 0, 0) 0.1008s;
    -webkit-transition: -webkit-transform 0.3192s cubic-bezier(0, 0, 0, 0) 0.1008s;
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
  .menu-close-animation {
    transition: transform 0.3192s cubic-bezier(0, 0, 0, 0) 0.1008s;
    -webkit-transition: -webkit-transform 0.3192s cubic-bezier(0, 0, 0, 0) 0.1008s;
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }

  .root-nav-item {
    display: block;
    padding: 0.5rem 1rem;
  }
  .sidebar-nav > nav {
    width: 100%;
    min-width: 250px;
  }
  .sidebar-nav {
    width: 0px;
    position: fixed;
    background-color: #fff;
    z-index: 2;
    left: 0;
    opacity: 1;
    overflow: hidden;
    margin-top: 0px;
    min-width: 0px;
    max-width: 325px;
    transition: width 0.75s ease-in, min-width 0.75s ease-in;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    height: 100%;
  }
  .sidebar-nav.expanded {
    width: 20%;
    min-width: 250px;
  }
  .m-left-10 {
    margin-left: 10px;
  }
  .m-top-8 {
    margin-top: 8px;
  }
  ul {
    list-style-type: none;
    margin-bottom: 0px;
  }
  i {
    margin-right: 5px;
  }
  .inner-menu {
    margin-top: 5px;
    /*border-top: 2px solid #343434; */
  }
</style>

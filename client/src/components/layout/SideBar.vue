<template lang="html">
  <!-- eslint-disable -->
  <div v-bind:class="{ 'sidebar-nav': true, 'expanded': $store.getters.sideBarState == true }">
    <nav class="text-left">
      <div class="root-nav-item" role="button" tabindex="0" @click="toggleUserMenu()">
        <i class="la la-user-circle"></i> {{ $store.getters.user.email }}
      </div>
      <div
        v-show="userMenuState"
        class="inner-menu"
        :style="{ 'border-top': '2px solid ' + this.$store.getters.themeColor }"
      >
        <ul>
          <li class="m-top-8" role="button" @click="$store.dispatch('logout')">
            <i class="la la-sign-out-alt"></i> Logout
          </li>
          <li class="m-top-8" role="button" @click="toggleSettings()"><i class="la la-cog"></i> Settings</li>
        </ul>
      </div>
      <div class="navItem">
        <div role="button" tabindex="0" @click="toggleProjectMenu()" class="root-nav-item">
          <i class="la la-folder"></i> Your Projects
        </div>
        <div
          v-show="projectMenuState"
          class="inner-menu"
          :style="{ 'border-top': '2px solid ' + this.$store.getters.themeColor }"
        >
          <ul>
            <li
              role="button"
              class="m-top-8 project-list-item"
              v-for="project in projects"
              @click="openProject(project._id, project.name)"
            >
              <i
                :class="{
                  'las': !project.githubSync,
                  'la-project-diagram': !project.githubSync,
                  'la-github': project.githubSync,
                  'lab': project.githubSync,
                }"
              ></i>
              {{ project.name }}
              <button class="delete-project-btn" @click="deleteProject(project._id, project.name)">
                <i class="la la-trash delete-project-icon"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="root-nav-item">
        <div class="" role="button" @click="openAllTasks()"><i class="la la-tasks"></i> View All Tasks</div>
      </div>
    </nav>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'SideBar',
    data() {
      return {
        userMenuState: false,
        projectMenuState: false,
        projects: null,
      };
    },
    methods: {
      openAllTasks() {
        this.$router.push({
          name: 'AllTasks',
        });
      },
      toggleSettings() {
        this.$router.push({
          name: 'Settings',
        });
      },
      deleteProject(projectId, projectName) {
        let confirmed = confirm("Permanently delete '" + projectName + "' and its associated tasks ?");
        if (confirmed) {
          this.$store.dispatch('deleteProject', projectId).then(() => {
            this.$router.push({
              name: 'AllTasks',
            });
          });
        }
      },
      toggleUserMenu() {
        this.userMenuState = !this.userMenuState;
      },
      toggleProjectMenu() {
        this.projectMenuState = !this.projectMenuState;
      },
      openProject(projectId, projectName) {
        this.$router.push({
          params: { id: projectId, name: projectName },
          name: 'Project', //normally would be project but testing reloading
        });
      },
    },
    computed: mapState(['loading']),
    watch: {
      loading(newValue) {
        if (newValue === false) {
          this.projects = this.$store.getters.projects;
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
    margin-top: 0px;
    width: 20%;
    min-width: 250px;
    max-width: 325px;
    transform: translateX(-100%);
    transition: transform 0.55s ease-in-out;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    height: 100%;
  }
  .sidebar-nav.expanded {
    transform: none;
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
    margin-right: 0.65em;
  }
  .inner-menu {
    margin-top: 5px;
    /*border-top: 2px solid #343434; */
  }
  .project-list-item {
    width: 100%;
    display: inline-flex;
    align-items: center;
  }
  .delete-project-btn {
    margin-left: auto;
    background: transparent;
    border: none;
    color: #dc3545;
    font-size: 1.15em;
    opacity: 0;
    transition: opacity 0.225s linear;
  }

  .project-list-item:hover .delete-project-btn {
    opacity: 1;
  }
</style>

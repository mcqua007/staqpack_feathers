<template>
  <div>
    <TopBar></TopBar>
    <!-- <SideBar v-on:projectOpen="projectOpen" v-on:loadAllTasks="loadAllTasks"></SideBar> -->
    <SideBar v-on:projectOpen="projectOpen"></SideBar>
    <div class="container margin">
      <Forms :projectId="currentProjectId"></Forms>
      <!-- Commented out because I;'m trying to use router view rather then use if statments - incommented below and remove router-view to go back to how it was-->
      <!-- <Project v-if="$store.getters.projectState == true"></Project> -->
      <!-- <Settings v-if="$store.getters.settingsState == true"></Settings>
      <AllTasks v-if="$store.getters.allTasksState == true"></AllTasks> -->

      <!-- may be better to not have key and use the watcher on project.vue -->
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
  //import feathersClient from '@/feathers-client-config.js'
  import TopBar from "@/components/layout/TopBar.vue";
  import SideBar from "@/components/layout/SideBar.vue";
  import Forms from "@/components/layout/Forms.vue";
  //Commented out because I;'m trying to use router view rather then use if statments

  //import Settings from "@/components/settings/Settings.vue";
  //import Project from "@/components/layout/Project.vue";
  //import AllTasks from "@/components/layout/AllTasks.vue";

  export default {
    name: "Main",
    data() {
      return {
        currentProjectId: null,
        currentProjectName: null,
      };
    },
    components: {
      TopBar,
      SideBar,
      Forms,
      //Commented out because I;'m trying to use router view rather then use if statments
      //Project,
      //Settings,
      //AllTasks,
    },
    methods: {
      projectOpen(id, name) {
        console.log("Project Open Main: ", id, name);
        // this.currentProjectId = id;
        // this.currentProjectName = name;
      },
    },
    mounted() {
      console.log("Main Mounted");
      //init all task data, then open AllTasks 'Page'
      // this.$store.dispatch("fetchAllTasks").then(() => {
      //   this.$store.commit("toggleAllTasksState", this.$store.getters.allTasksState); //open allTasks page
      // });

      // //init project data
      // this.$store.dispatch("fetchProjects").then((res) => {
      //   console.log("App Vue: - Called fetchProjects", res);
      //   this.$store.commit("setLoading", false);
      // });
    },
    beforeMounted() {},
    created() {
      console.log("Main Created", this.$route.params.id);
      //init all task data, then open AllTasks 'Page'
      console.log;

      this.$store.dispatch("fetchAllTasks").then(() => {
        this.$store.commit("toggleAllTasksState", this.$store.getters.allTasksState); //open allTasks page
      });

      //init project data
      this.$store.dispatch("fetchProjects").then((res) => {
        console.log("App Vue: - Called fetchProjects", res);
        this.$store.commit("setLoading", false);
        console.log("Main - Route: ", this.$route);
        if (this.$route.name === "project") {
          this.$store.dispatch("getAllCurrentProjectData", this.$route.params.id);
        }
      });
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .margin {
    margin-top: 50px;
    margin-bottom: 50px;
  }
</style>

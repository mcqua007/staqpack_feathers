<template>
  <div>
    <TopBar></TopBar>
    <!-- <SideBar v-on:projectOpen="projectOpen" v-on:loadAllTasks="loadAllTasks"></SideBar> -->
    <SideBar  v-on:projectOpen="projectOpen" ></SideBar>
    <div class="container margin">
      <Forms :projectId="currentProjectId"></Forms>
      <Project v-if="$store.getters.projectState == true"></Project>
      <Settings v-if="$store.getters.settingsState == true"></Settings>
      <AllTasks v-if="$store.getters.allTasksState == true"></AllTasks>
    </div>
  
  </div>
</template>

<script>
//import feathersClient from '@/feathers-client-config.js'
import TopBar from '@/components/layout/TopBar.vue'
import SideBar from '@/components/layout/SideBar.vue'
import Forms from '@/components/layout/Forms.vue'
import Settings from '@/components/settings/Settings.vue'
import Project from '@/components/layout/Project.vue'
import AllTasks from '@/components/layout/AllTasks.vue'


export default {
  name: 'Main',
  data(){
    return{
      currentProjectId: null,
      currentProjectName: null,
    }
  },
  components:{
    TopBar,
    SideBar,
    Forms,
    Project,
    Settings,
    AllTasks
  },
  methods:{
     projectOpen (id, name) {
       console.log("Project Open Main: ", id, name)
      // this.currentProjectId = id;
      // this.currentProjectName = name;
    },
  },
  mounted(){

      //init all task data, then open AllTasks 'Page'
      this.$store.dispatch('fetchAllTasks').then(() =>{
        this.$store.commit("toggleAllTasksState", this.$store.getters.allTasksState); //open allTasks page
      });

    //init project data 
     this.$store.dispatch('fetchProjects').then((res) =>{
       console.log("App Vue: - Called fetchProjects", res);
       this.$store.commit('setLoading', false);
      });

  }
}
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
.margin{
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>

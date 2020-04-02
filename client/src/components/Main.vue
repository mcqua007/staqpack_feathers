<template>
  <div>
    <TopBar></TopBar>
    <!-- <SideBar v-on:projectOpen="projectOpen" v-on:loadAllTasks="loadAllTasks"></SideBar> -->
    <SideBar  v-on:projectOpen="projectOpen" ></SideBar>
    <div class="container margin">
      <Forms v-bind:projectId="currentProjectId"></Forms>
       <div v-if="$store.getters.projectState == true">
       <div class="project-header-bar">
         <div class="project-title">
          <div v-if="currentProjectName != null">
            <h3>{{ currentProjectName }}</h3>
           </div>
           <div v-else>
            All Tasks
         </div>
       </div>
        <div v-if="currentProjectId != null" style="margin-left:auto;">
          <button class="delete-project-btn" @click="deleteProject(currentProjectId)"><i class="fa fa-trash delete-project-icon"></i></button>
        </div>
       </div>
      <hr />
      <Project></Project>
     </div>
    </div>
  
  </div>
</template>

<script>
//import feathersClient from '@/feathers-client-config.js'
import TopBar from '@/components/layout/TopBar.vue'
import SideBar from '@/components/layout/SideBar.vue'
import Forms from '@/components/layout/Forms.vue'
import Project from '@/components/layout/Project.vue'


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
    Project
  },
  methods:{
     projectOpen (id, name) {
       console.log("Project Open Main: ", id, name)
      this.currentProjectId = id
      this.currentProjectName = name
      //this.returnTasks('projectId', this.currentProjectId)
    },
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

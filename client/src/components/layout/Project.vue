<template>
  <div class="project"><!-- componenet wrapper -->
    <div class="project-header-bar">
      <div class="project-title">
          <div class ="text-left" v-if="$store.getters.currentProject.name != null">
            <h3>{{ $store.getters.currentProject.name }}</h3>
           </div>
           <div v-else>
            <h3>All Tasks</h3>
         </div>
       </div>
        <button  v-if="$store.getters.currentProject.id != null" class="delete-project-btn" @click="deleteProject($store.getters.currentProject.id)"><i class="fa fa-trash delete-project-icon"></i></button>
       </div>
      <hr />
    <div class="row">
        <template v-for="task in tasks">
          <TaskCard v-bind:task="task" :key="task.id"></TaskCard>
        </template>
    </div>
  </div> <!-- end componenet wrapper -->
</template>

<script>
import TaskCard from '@/components/TaskCard.vue'
import feathersClient from '@/feathers-client-config.js'
//import { mapState } from 'vuex';

export default {
  name: 'Project',
  components: {
    TaskCard
  },
  //props: ['responseData'],
  data(){
    return {
      //projectName: null,
      //projectId: null,
      //tasks: null,      
    }
  },
  methods: {
    deleteProject(projectId){
        let project_name = this.$store.getters.currentProject.name;
        let confirmed = confirm("Permanently delete '"+project_name+"' and its associated tasks ?");
        if(confirmed){
         this.$store.dispatch('deleteProject', projectId).then((res)=>{
          console.log("Delete Project Res", res);
          //toggle Project State to be hidden - maybe eventually go back to app hoem/dashboard
          this.$store.commit("toggleProjectState", this.$store.getters.projectState);
       });
      }
    }
  },
  computed:{
      tasks(){
        return this.$store.getters.currentProjectTasks.data;
      }
  },
  created(){     
     feathersClient.service('tasks').on('created', (newTask) => {
       if(this.$store.getters.currentProject.id === newTask.projectId)
         this.tasks.push(newTask);
     });
  },
  mounted(){
    //   this.$store.dispatch('fetchCurrentProjectTasks', { query: {projectId: this.$store.getters.currentProject.id}}).then(() =>{
    //       this.tasks = this.$store.getters.currentProjectTasks.data;
    //       console.log("CurrentProjectTasks:", this.$store.getters.currentProjectTasks);
    //   });
  }
}
</script>

<style lang="css" scoped>

.project-header-bar{
    display:inline-flex;
    align-items: center;
    width:100%;
}
.delete-project-btn{
    margin-left:auto;
    font-size:25px;
    background: transparent;
    border: none;
    color: #dc3545;

}

/* USED IN MAIN OTHER COMPONENS - MAIN *NOT DRY */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/*================================*/
</style>

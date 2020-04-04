<template>
<div class="task-form"><!-- componenet wrapper -->
  <transition name="fade">
   <div  v-if="$store.getters.taskFormState == true" class="jumbotron" style=" margin-top:10px;">
     <i class="fa fa-times close-form-icon" role="button" @click="hideTaskForm()"></i>
      <h3>Add New Task</h3>
      <form data-project-id="" @submit.prevent>
        <div class="row">
          <div class="form-group col-md-4">
            <label for="issueDescInput">Task</label>
            <input type="text" class="form-control" placeholder="Name of new task..." v-model="name">
          </div>
          <div class="form-group col-md-4">
          <label for="issueSeverityInput">Severity</label>
              <select class="form-control" v-model="severity">
              <option value="1" >Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
          </select>
          </div>
          <!-- Temporary measure to select proejct name a task will belong too -->
         <div class="form-group col-md-4">
          <label for="issueProjectId">Project</label>
            <select class="form-control" v-model="project_id">
                <option value="null" disabled>[Choose Project]</option>
                <option  v-for="project in projects" :value="project._id" :key="project.name">{{ project.name }}</option>
            </select>
          </div>
          <!-- use v-if project is a team project then allow to assign -->
          <!-- HAve a list of people from the team to assign to -->
          <!-- <div class="form-group col-md-4">
           <label for="issueAssignedToInput">Assigned To</label>
           <input type="text" class="form-control" placeholder="Assign To..." v-model="assignTo">
          </div> -->
        </div>
          <div class="form-group">
          <label for="issueDescInput">Description</label>
          <input type="text" class="form-control" placeholder="Describe the issue..." v-model="description">
          </div>
          <p class="red-text" v-if="feedback">
            {{ feedback }}
          </p>
          <button class="btn btn-primary" @click="submitTaskForm()">Add</button>
      </form>
    </div> 
  </transition> 
 </div> 
</template>

<script>
import feathersClient from '@/feathers-client-config.js'
//import io from 'socket.io-client'
import { mapState } from 'vuex';

export default {
  name: 'TaskForm',
  props: ['currentProjectId'],
  data(){
    return {
      name: null,
      severity: '1',
      assignTo: null,
      description: null,
      feedback: null,
      project_id: null,
      projects: null,
    }
  },
  methods: {
    hideTaskForm(){
      this.$store.commit('toggleTaskForm', this.$store.getters.taskFormState);
    },
    submitTaskForm(){
      if(this.name && this.severity  && this.description){
        console.log("Task Form:{ title: "+ this.title +"| description: "+ this.description+"| severity: "+ this.severity + "| asigned "+ this.assignTo + "| project "+ this.projectId);

        let form_data = {
          name: this.name,
          severity: this.severity,
         //assignTo: this.assignTo,
          description: this.description,
          projectId: this.project_id,
        }
        feathersClient.service('tasks').create(form_data);

        //RESETING FORM VALUES - SINCE 2WAY BOUND
         this.name = null;
         this.severity = 'Low';
         //this.assignTo = null;
         this.description = null;
         this.project_id = null;
         //RETURN TASKS
         //Emit event to main down to project d Task that where submitted
         this.$emit('taskFormInput');
        
      }
       else {
          this.feedback = "You must fill out all form fields."
        }
    }
  },
  computed: mapState(['loading']),
  watch: {
      loading(newValue, oldValue){
       console.log(`Updating from ${oldValue} to ${newValue}`);
        if (newValue === false) {
          this.projects =  this.$store.getters.projects.data;
            console.log('task- projects watch', this.projects);
        }
      }
  },
  created(){
      //this.projects =  this.$store.getters.projects.data;
      console.log('projects', this.projects);
  },
  mounted(){


      //this.$store.dispatch('fetchProjects', { query : {name: 'project 1'}}); //how to query 
      feathersClient.service('tasks').find().then((res) =>{
          console.log("Feathers service - task find", res);
      });

     feathersClient.service('tasks').on('created', (message) => {
         console.log('New Tasks created:', message)
     });



//can use socket emit in side authenticated like here  used for example 
// const socket = io('http://localhost:3030');

// socket.emit('create', 'authentication', {
//   strategy: 'local',
//   email: 'john@test.com',
//   password: 'password2'
// }, function(error, authResult) {
//   console.log(authResult); 
//   // authResult will be {"accessToken": "your token", "user": user }
//   // You can now send authenticated messages to the server
//     socket.emit('find', 'tasks', (error, data) => {
//         console.log('socket - Found all created tasks', data);
//         console.log('socker error', error);
//        });
//    });

   //end socket test
  }
}
</script>

<style lang="css" scoped>
.red-text{
  color: red;
}
.close-form-icon{
 float: right;
 font-size:30px;
 top: -30px;color: #ccc;
 position: relative;
}

/* USED IN MAIN OTHER COMPONENS - MAIN *NOT DRY */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.form-group{
  text-align: left;
}
/*================================*/
</style>

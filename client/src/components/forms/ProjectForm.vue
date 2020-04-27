<template>
  <div class="project-form">
    <transition name="fade">
      <div v-if="$store.getters.projectFormState == true" class="jumbotron">
        <i class="fa fa-times close" role="button" @click="$store.commit('toggleProjectForm', $store.getters.projectFormState)"></i>
        <h3 style="margin-bottom: 25px;">Add a New Project</h3>
        <form  @submit.prevent>
          <div class="row">
            <div class="form-group col-md-4 col-12">
              <label for="projectDescInput">Title</label>
              <input type="text" class="form-control" id="project_title_input" placeholder="Title..."
                v-model="projectName">
            </div>
            <div class="form-group col-md-4 col-12">
              <label for="projetTypeInput">Type</label>
              <select class="form-control" v-model="projectType">
                <option value="personal">Personal</option>
                <option value="team">Team</option>
              </select>
            </div>
            <div class="form-group col-md-4 col-12">
              <div v-show="projectType == 'team'">
                <label for="projectTeamsInput">Teams</label>
                <!-- <select class="form-control" v-model="team">
                    <option value="none" disabled> -- Pick Team --</option>
                    <option v-for="option in options"	v-bind:title="option.teamName" v-bind:value="option.teamId">{{ option.teamName }}</option>
                 </select> -->
              </div>
            </div>
          </div>
          <div class="row flex-end">
           <div class="form-group col-md-6 col-12">
            <label for="issueDescInput">Project Description (optional)</label>
            <input type="text" class="form-control"  placeholder="Describe the Project..." v-model="projectDesc">
          </div>
           <div class="form-group col-md-3 col-12">
            <label for="projectDueDate">Due Date (optional)</label>
            <input type="date" class="form-control" v-model="projectDueDate">
           </div>
           <div class="form-group col-md-3 col-12">
             <button class="btn btn-primary btn-block" @click="submitProjectForm()">Create Project</button>
           </div>
          </div>
        <transition name="fade">
        <p :class="{'alert': true, 'text-center': true, 'alert-danger':(alertType === 'danger'), 'alert-success':(alertType === 'success'), 'alert-warning':(alertType === 'warning'), 'alert-primary':(alertType === 'primary')}" v-show="feedback">
            {{ feedback }}
         </p>
        </transition> 
          <div v-if="progress" style="margin-top:20px;">
            <div class="col-12  b-progress">
              <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" id="progressBar" role="progressbar"
                  style="" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </form>
      </div> <!-- end form jumbotron -->
    </transition>
  </div> <!-- end componenet wrapper -->
</template>
<script>
import feathersClient from '@/feathers-client-config.js'
  export default {
    name: 'ProjectForm',
    data() {
      return {
        projectName: null,
        projectType: 'personal',
        team: 'none',
        projectDesc: null,
        projectDueDate: null,
        feedback: null,
        alertType: null,
        projectData: null,
        responseData: null,
        progress: false,
        userData: {},
        options: []
      }
    },
    methods: {
      hideProjectForm() {
        this.$store.commit('toggleProjectForm', this.$store.getters.projectFormState);
      },
      submitProjectForm() {
        var that = this;
        if (this.projectName && this.projectType) {
          //show progress bar
          this.progress = true;
          this.updateProgressBar();
         // let user = this.$store.getUser;
          let formData = {
            name: this.projectName,
            type: this.projectType,
            //team: this.team,
            description: this.projectDesc,
            dueDate: this.projectDueDate
          }
           this.$store.dispatch('createProject', formData).then(() =>{
           //RESETING FORM VALUES 
           this.projectName = null;
           this.projectType = 'personal';
           //this.team = 'none';
           this.projectDesc = null;
           this.projectDueDate = null;
            setTimeout(function(){
              that.progress = false;
             that.alertFeedback("Your new project has been created!", 'primary');
            }, 490);
          }).catch((e) => {
           this.alertFeedback("Error: "+e, 'danger'); //alert error feedback
          });  
          //load new project here using routes
        } else {
          this.alertFeedback("You must fill out all required fields.", 'danger');
        }
      },
      //THESE FUNCTIONS ARE DEFINED IN TEAM FORM AS WELL - NEED TO DEINFE THEM IN ONE placeholder
      alertFeedback(message, type, time){ 
        let timeOut = (time != undefined) ? time : 2500;
        this.feedback = message;
        this.alertType = type;
        var that = this;
        setTimeout(function(){
          that.feedback = null;
          this.alertType = null;
        }, timeOut);
      },
      updateProgressBar() {
        var width = 1;
        var identity = setInterval(function () {
          if (width >= 100) {
            clearInterval(identity);
          } else {
            width += 10;
            var element = document.getElementById("progressBar");
            element.style.width = width + '%';
          }
        }, 10);
      }
    },
    mounted() {
       //doing nothing just shows new projects created 
      feathersClient.service('projects').on('created', message => console.log('New projects created:', message));
    }
  }
</script>
<style lang="css" scoped>
  .red-text {
    color: red;
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
  .flex-end{
    align-items: flex-end;
  }
  .jumbotron{
    padding: 30px 20px;
  }
    .close{
    float: right;
    font-size:30px;
    color: #ccc;
    position: relative;
  }
</style>
<template>
  <div>
    <!-- componenet wrapper -->
    <!-- Project Manager Form -->
    <transition name="fade">
      <div v-if="$store.getters.projectFormState == true" class="jumbotron" id="task-manager" data-show="false"
        style=" margin-top:10px;">
        <i class="fa fa-times" @click="hideProjectForm()"
          style="float: right;font-size:30px;top: -30px;color: #ccc;position: relative;"></i>
        <div style="100%" id="task-alert-flash"></div>
        <h3>Add a New Project</h3>
        <form id="project_form" data-project-id="" @submit.prevent>
          <div class="row">
            <div class="form-group col-md-4" id="project_title_group">
              <label for="projectDescInput">Title</label>
              <input type="text" class="form-control" id="project_title_input" placeholder="Title..."
                v-model="projectName">
            </div>
            <div class="form-group col-md-4" id="project-type">
              <label for="projetTypeInput">Type</label>
              <select class="form-control" id="project_type_input" v-model="projectType">
                <option value="personal">Personal</option>
                <option value="team">Team</option>
              </select>
            </div>
            <div class="form-group col-md-4" id="project_team_group">
              <div v-show="projectType == 'team'">
                <label for="projectTeamsInput">Teams</label>
                <!-- <select class="form-control" v-model="team">
                    <option value="none" disabled> -- Pick Team --</option>
                    <option v-for="option in options"	v-bind:title="option.teamName" v-bind:value="option.teamId">{{ option.teamName }}</option>
                 </select> -->
              </div>
            </div>
          </div>
          <div class="form-group" id="project_description_group">
            <label for="issueDescInput">Project Description</label>
            <input type="text" class="form-control" id="project_description_input" placeholder="Describe the Project..."
              v-model="projectDesc">
          </div>
          <button type="submit" class="btn btn-primary" @click="submitProjectForm()">Add</button>
          <div class="alert alert-danger text-center" v-if="feedback"> {{ feedback }} </div>
          <div class="alert alert-primary text-center" v-show="successFeedback" style="margin-top:20px;">
            {{ successFeedback }} </div>
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
  // import db from '@/firebase/init'
  // import firebase from 'firebase'
  export default {
    name: 'ProjectForm',
    data() {
      return {
        projectName: null,
        projectType: 'personal',
        team: 'none',
        projectDesc: null,
        feedback: null,
        successFeedback: null,
        projectData: null,
        responseData: null,
        progress: false,
        userData: {},
        options: []
      }
    },
    methods: {
      hideProjectForm() {
        this.$store.commit("hideProjectForm");
      },
      submitProjectForm() {
        var that = this;
        if (this.projectName && this.projectType && this.projectDesc) {
          console.log("Project Form:{ Name: " + this.projectName + "| description: " + this.projectDesc +
            "project type: " + this.projectType);
          //show progress bar
          that.progress = true;
          that.updateProgressBar();
          // let user = firebase.auth().currentUser;
          // db.collection('projects').add({
          //   name: this.projectName,
          //   type: this.projectType,
          //   team: this.team,
          //   description: this.projectDesc,
          //   userId: user.uid,
          //   gitSync: false,
          //   open: 1,
          //   timestamp: Date.now()
          // }).then(docRef => {
          //   console.log("Project Created! Project Id:", docRef.id);
          //   //update team with the project id and project Name
          //   console.log("Project Name Test:", this.projectName);
          //  let newElement = {
          //    projectId: docRef.id,
          //    projectName: this.projectName,
          //  }
          //  //UPDATE EITHER TEAM OR USER OBJECT BASED ON THE TYPE OF PROJECT
          //      if(that.projectType == 'team'){
          //        db.collection("teams")
          //          .doc(that.team)
          //          .update({
          //            projects: firebase.firestore.FieldValue.arrayUnion(newElement)
          //          })
          //          .catch(err => {
          //            console.log(err);
          //            reject(err);
          //          });
          //      }
          //      else if(that.projectType == 'personal'){
          //        db.collection("users")
          //          .doc(that.userData.username)
          //          .update({
          //            projects: firebase.firestore.FieldValue.arrayUnion(newElement)
          //          })
          //          .catch(err => {
          //            console.log(err);
          //            reject(err);
          //          });
          //      }
          //      //RESETING FORM VALUES - SINCE 2WAY BOUND
          //       this.projectName = null;
          //       this.projectType = 'personal';
          //       this.team = 'none';
          //       this.projectDesc = null;
          //       setTimeout(function(){
          //       that.progress = false;
          //       that.alertSuccessFeedback("Your new project has been created!");
          //       }, 490)
          // }).catch(err => {
          //   console.log(err)
          // })
          //load new project here using routes
        } else {
          this.alertFeedback("You must fill out all form fields.");
        }
      },
      //   getUserData(){
      //     var me = this;
      //     let user = firebase.auth().currentUser;
      //     return new Promise(function(resolve, reject){
      //       db.collection("users").where("email", "==", user.email).get()
      //       .then(function(querySnapshot) {
      //           querySnapshot.forEach(function(doc) {
      //             // doc.data() is never undefined for query doc snapshots
      //             console.log(doc.id, " => ", doc.data());
      //               me.userData = doc.data();
      //               resolve(me.userData);
      //           })
      //        }).catch(err => {
      //          reject(err);
      //        })
      //     })
      // },
      //THESE FUNCTIONS ARE DEFINED IN TEAM FORM AS WELL - NEED TO DEINFE THEM IN ONE placeholder
      alertFeedback(message) {
        var me = this;
        this.feedback = message;
        //REMOVED IT AFFTER 1 SECOND
        setTimeout(function () {
          me.feedback = null;
        }, 4000);
      },
      alertSuccessFeedback(message) {
        this.successFeedback = message;
        //REMOVED IT AFFTER 1 SECOND
        var me = this;
        setTimeout(function () {
          me.successFeedback = null;
        }, 2500);
      },
      updateProgressBar() {
        var width = 1;
        var identity = setInterval(function () {
          if (width >= 100) {
            console.log("width: ", width)
            clearInterval(identity);
          } else {
            console.log("width: ", width)
            width += 10;
            var element = document.getElementById("progressBar");
            element.style.width = width + '%';
          }
        }, 10);
      }
    },
    mounted() {
      // this.getTeams();
      // var that = this;
      // this.getUserData().then(data => {
      //   console.log("Promise Data ", data);
      //   //set userData to the user object
      //   that.userData = data;
      //   //SET OPTIONS TO TEAM NAMES DATA
      //   that.options = data.teams;
      // })
      // console.log("second con", this.userData);
    }
  }
</script>
<style lang="css" scoped>
  .red-text {
    color: red;
  }
</style>
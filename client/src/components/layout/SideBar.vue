<template lang="html">
<!-- eslint-disable -->
  <div v-bind:class="{'sidebar-nav':true, 'expanded':($store.getters.sideBarState == true)}">
   <nav class="text-left">
     <div class="root-nav-item" role="button" tabindex="0" @click="toggleUserMenu()"><i class="fas fa-user-circle"></i> {{ $store.getters.getUser.email}} </div>
      <div v-show="userMenuState" class="inner-menu">
        <ul>
          <li class="m-top-8" role="button"  @click="store.dispatch('logout')"><i class="fas fa-sign-out-alt"></i> Logout</li>
               <!-- Might not do it this way if i want to go to a new page -->
               <!-- <a class="nav-link" role="link"  @click="toggleGitSettings()"> <i class="fab fa-github"></i>&nbsp; Git Settings</a> -->
               <!-- <router-link to="/gitsettings">Git Settings</router-link> -->
       </ul>
      </div>
       <div class="navItem">
         <div role="button" tabindex="0" @click="toggleProjectMenu()" class="root-nav-item"> 
           <i class="fa fa-folder"></i> Your Projects
        </div>
         <div v-show="projectMenuState" class="inner-menu">
          <ul>
           <li role="button" class="m-top-8" v-for="project in projects" @click="openProject(project._id, project.name)">
             <i class="fas fa-project-diagram"></i> {{ project.name }}
           </li>
          </ul>
        </div>
      </div>
         <!-- <div class="navItem">
           <div role="link" tabindex="0" @click="toggleTeamMenu()"  class="navItemLink link nav-link"> <i class="fa fa-users"></i>&nbsp; Your Teams</div>
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
          <div class="" role="button" @click="openAllTasks()"> <i class="fa fa-tasks"></i> View All Tasks</div>
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
// import Router from 'vue-router'
import { mapState } from 'vuex';

export default {
  name: 'SideBar',
  data(){
    return{
      userMenuState: false,
      projectMenuState: false,
      teamMenuState: false,
      teamProjectMenuState: false,
      teamId: null,
      teamProjects: null,
      projects: null,
      teams: [],
      teamProjectsData: [],
    }
  },
  methods: {
  //   openAllTasks(){
  //     console.log("in opentask sidebar");
  //     this.$emit('loadAllTasks');
  //   },
  //   toggleGitSettings(){
  //     //Toggle Project to true if is is not visible
  //     if(this.$store.getters.projectState == true){
  //       this.$store.commit("toggleProjectState", this.$store.getters.projectState);
  //     }
  //     //Toggle git settings
  //     this.$store.commit("toggleGitSettings", this.$store.getters.gitSettingsState);
  //  },
   toggleUserMenu(){
     this.userMenuState = !this.userMenuState;
   },
   toggleProjectMenu(){
     this.projectMenuState = !this.projectMenuState;
   },
  //  toggleTeamMenu(){
  //    this.teamMenuState = !this.teamMenuState;
  //  },
  //  toggleTeamProjectMenu(id){
  //    this.teamProjectMenuState = !this.teamProjectMenuState;
  //    if(this.teamProjectMenuState == true){
  //       this.teamId = id; //may not be needded ?
  //       //Search teams array
  //       for(var i in this.teamProjectsData){      
  //         if(this.teamProjectsData[i].teamId == id){
  //           this.teamProjects = this.teamProjectsData[i].data.projects;
  //         }
  //      }
  //    }
  //    else {     
  //      this.teamProjects = null; //Set team projects to null , if not displaying
  //    }
  //  },
   logout(){
      //alert('You are Logged out!');
      this.$store.dispatch('logout');
    },
   openProject(projectId, projectName){
     this.$emit('projectOpen', projectId, projectName);

     //Hide Git Settings if it is open
    //  if(this.$store.getters.gitSettingsState == true){
    //    this.$store.commit("toggleGitSettings", this.$store.getters.gitSettingsState);
    //  }
    //Toggle Project to true if is is not visible
    if(this.$store.getters.projectState == false){
      this.$store.commit("toggleProjectState", this.$store.getters.projectState);
    }
  },
  // buildTeamProjects(teamData){
  //   var that = this;
  //   var promises = [];

  //  return new Promise((resolve) => {

  //   for(var i in teamData){  
  //     promises.push(
  //       this.$store.dispatch('fetchTeamData', teamData[i].teamId).then());
  //    }
  //    Promise.all(promises).then(function() { 
  //       resolve({success:true});
  //     }, 
  //     function(err){
  //       resolve({success:false, error_message: err});
  //    });
  //  });
  // },
  // initializeData(){
  //   console.log("Initilize Data Sidebar Function");
  //   this.$store.dispatch('fetchUserData', this.$store.getters.getUser).then(() =>{

  //   this.userData = this.$store.getters.getUserData;
  //   this.projects = this.userData.projects;
  //   this.teams = this.userData.teams;
  
  //   //build the team projects array
  //   this.buildTeamProjects(this.teams).then((res) => {
  //    if(res.success){
  //     console.log("Finished buildTeamProjects!", this.$store.getters.getTeamProjectData);
  //     this.teamProjectsData = this.$store.getters.getTeamProjectData;
  //    }      
  //   });
  //  });
  // },
 },
 computed: mapState(['loading']),
 watch:{
    loading(newValue, oldValue){
       console.log(`Updating from ${oldValue} to ${newValue}`);
        if (newValue === false) {
          this.projects =  this.$store.getters.getProjects.data;
            console.log('task- projects watch', this.projects);
        }
      }
 },
 created(){
  //  this.initializeData();
 },
 mounted(){

  //  this.initializeData();

 }
}
</script>

<style lang="css" scoped>
.menu-animation{
    transition: transform .3192s cubic-bezier(0.0, 0.0, 0.0, 0.0) .1008s;
      -webkit-transition: -webkit-transform .3192s cubic-bezier(0.0, 0.0, 0.0, 0.0) .1008s;
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
}
.menu-close-animation{
    transition: transform .3192s cubic-bezier(0.0, 0.0, 0.0, 0.0) .1008s;
     -webkit-transition: -webkit-transform .3192s cubic-bezier(0.0, 0.0, 0.0, 0.0) .1008s;
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
}

.root-nav-item{
    display: block;
    padding: .5rem 1rem;
}
.sidebar-nav> nav{
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
  transition: width .75s ease-in, min-width .75s ease-in;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  height:100%;
}
.sidebar-nav.expanded{
  width: 20%;
  min-width: 250px;
}
.m-left-10{
margin-left: 10px;
}
.m-top-8{
 margin-top:8px;
}
ul {
  list-style-type: none;
  margin-bottom: 0px;
}
i{
  margin-right: 5px;
}
.inner-menu{
  margin-top: 5px;
  border-top: 2px solid #007BFF;
}
</style>

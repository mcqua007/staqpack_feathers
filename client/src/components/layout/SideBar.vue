<template lang="html">
<!-- eslint-disable -->
  <div v-bind:class="{'sidebar-nav':true, 'expanded':($store.getters.sideBarState == true)}">
   <!-- <nav v-bind:class="{'nav':true, 'flex-column':true, 'collapsed':($store.getters.sideBarState == false)} " id="menu-list" style=""> -->
      <div class="nav-link text-left" role="button" tabindex="0" @click="toggleUserMenu()" id="sidebar-username"><i class="fas fa-user-circle"></i>&nbsp; {{ $store.getters.getUser.email}} </div>
      <div v-show="userMenuState">
        <div class="bordertop"></div> <!-- Border Top - To Show Active -->
        <div class="text-left" id="user-menu" data-collapsed="false">
            <div class="m-left-10">
               <a class="nav-link" role="link"  @click="store.dispatch('logout')"><i class="fas fa-sign-out-alt"></i>&nbsp; Logout</a>
               <!-- Might not do it this way if i want to go to a new page -->
               <!-- <a class="nav-link" role="link"  @click="toggleGitSettings()"> <i class="fab fa-github"></i>&nbsp; Git Settings</a> -->
               <!-- <router-link to="/gitsettings">Git Settings</router-link> -->
            </div>
       </div>
      </div>
       <!-- <div class="navItem">
         <div role="link" tabindex="0" @click="toggleProjectMenu()" class="navItemLink link nav-link"> <i class="fa fa-folder"></i>&nbsp; Your Projects</div>
             <div v-show="projectMenuState" id="user-project-menu" >
                <div class="bordertop"></div>
               <div class="user-menu-items" id="user-projects-menu-items">
                <ul style="">
                   <li role="link" class="m-top-8" v-for="project in projects" @click="openProject(project.projectId, project.projectName)"	v-bind:data-title="project.projectName" v-bind:data-id="project.projectId">
                     <i class="fas fa-layer-group"></i>&nbsp;   {{ project.projectName }}
                    </li>
                </ul>
              </div>
            </div>
         </div> -->
         <!-- <div class="navItem">
           <div role="link" tabindex="0" @click="toggleTeamMenu()"  class="navItemLink link nav-link"> <i class="fa fa-users"></i>&nbsp; Your Teams</div>
           <div  v-show="teamMenuState" class="" id="team-menu">
             <div class="bordertop"></div>
                <div class="m-left-10">
                 <!-- For Loop for Team Names -->
                  <div  v-for="team in teams" class="navItem nav-link">
                    <div role="link" tabindex="0" @click="toggleTeamProjectMenu(team.teamId)" v-bind:data-title="team.teamName" v-bind:data-id="team.teamId"  class="">{{ team.teamName }}</div>
                    <div v-show="teamProjectMenuState == true && teamId == team.teamId" v-bind:data-id="team.teamId">
                      <div class="bordertop"></div>
                         <div v-for="teamProject in teamProjects" class="m-left-10">
                           <!-- For Loop For Team Projects -->
                           <div class="navItem nav-link" id="sidebar-project-wrap-">
                             <span role="link" tabindex="0" @click="openProject(teamProject.projectId, teamProject.projectName)"	 v-bind:data-id="teamProject.projectId"  class="">{{ teamProject.projectName }}</span>
                           </div>
                           <!-- End Team Projects Loop  -->
                         </div>
                      </div>
                  </div>  <!-- End my teams loop -->
                </div>
             </div>
           </div>
        <!-- <div class="navItem nav-link">
          <div class="" role="link" @click="openAllTasks()"> <i class="fa fa-tasks"></i>&nbsp; View All Tasks</div>
        </div>  -->
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

export default {
  name: 'SideBar',
  data(){
    return{
      userMenuState: false,
      projectMenuState: false,
      teamMenuState: false,
      teamProjectMenuState: false,
      teamId: null,
      userData: null,
      teamProjects: null,
      projects: [],
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
  //  toggleProjectMenu(){
  //    this.projectMenuState = !this.projectMenuState;
  //  },
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
  //  openProject(projectId, projectName){
  //    this.$emit('projectOpen', projectId, projectName);

  //    //Hide Git Settings if it is open
  //    if(this.$store.getters.gitSettingsState == true){
  //      this.$store.commit("toggleGitSettings", this.$store.getters.gitSettingsState);
  //    }
  //   //Toggle Project to true if is is not visible
  //   if(this.$store.getters.projectState == false){
  //     this.$store.commit("toggleProjectState", this.$store.getters.projectState);
  //   }
  // },
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
.sidebar-nav #menu-list{
  width: 0px;
  opacity: 0;
  transition: width .3s linear, opacity .95s ease-out .5s;
}
.sidebar-nav.expanded #menu-list{
  width: 100%;
  opacity:1;
}
#menu-list.collapsed{
 display:none;
 opacity: 0;
 width: 0px;
}
.sidebar-nav {
  width: 0px;
  position: fixed;
  z-index: 2;
  left: 0;
  opacity: .5;
  overflow: hidden;
  margin-top: 0px;
  min-width: 0px;
  max-width: 325px;
  transition: all .45s linear;
  height:100%;
}
.user-menu-tems{
  margin-left:-8px;
}
.sidebar-nav.expanded{
  opacity:1;
  background-color: #fff;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  width: 20%;
  overflow:auto;
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
}
.bordertop {
  margin-top: 10px;
  border-top: 2px solid #007BFF;
}
</style>

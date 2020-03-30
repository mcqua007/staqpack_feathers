<template lang="html">
<div class="top-bar-bg">
  <div class="menu-icon">
   <div v-if="$store.getters.sideBarState == true" >
      <i class="fa fa-times menu-icon-style" id="menu-icon-close" @click="toggleSideBar()"></i>
    </div>
     <div v-if="$store.getters.sideBarState == false" >
      <i @click="toggleSideBar()" class="fa fa-bars menu-icon-style" id="menu-icon" ></i>
    </div>
  </div>
    <center><h3 class="logo-font logo-style">Staqpack</h3></center>
    <div class="btn-group btn-group-style">
    <button class="add-btn-menu"  type="button" id="btnGroupDrop1" data-toggle='dropdown' aria-haspopup="true" aria-expanded="false" >
      <i class="fa fa-plus  m-right-5 c-white" id="add-task-icon"></i>
      <span class="add-task-text c-white"> Add </span></button>
    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="btnGroupDrop1" data-dropdown-task-id="">
      <!-- <button class="dropdown-item"   type="button" data-showfront-btn-id="" @click="toggleTaskForm()" > Task </button> -->
      <button class="dropdown-item"   type="button" data-showfront-btn-id="" @click="toggleProjectForm()" > Project</button>
      <!-- <button class="dropdown-item"   type="button" data-complete-btn-id=""  @click="toggleTeamForm()"> Team</button> -->
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'TopBar',
  methods: {
    // toggleTaskForm () {
    //   // Hide any other forms open by turning there state to false

    //   // Hide Project Form
    //   this.$store.commit('hideProjectForm')
    //   // Hide Team Form
    //   this.$store.commit('hideTeamForm')
    //   // Toggle Task From state
    //   this.$store.commit('toggleTaskForm', this.$store.getters.taskFormState)
    //   // if form showing/true
    //   if (this.$store.getters.taskFormState == true) {
    //     // if in view scroll up to top of page
    //     window.scrollTo(0, 0)
    //   }
    // },
    toggleProjectForm () {
      // Hide any other forms open by turning there state to false

      // Hide Task Form
    //   this.$store.commit('hideTaskForm')
    //   // Hide Team Form
    //   this.$store.commit('hideTeamForm')
      // Toggle Project Form state
      this.$store.commit('toggleProjectForm', this.$store.getters.projectFormState)
      // if form showing/true
      if (this.$store.getters.projectFormState == true) {
        // if in view scroll up to top of page
        window.scrollTo(0, 0)
      }
    },
    // toggleTeamForm () {
    //   // Hide any other forms open by turning there state to false

    //   // Hide Task Form
    //   this.$store.commit('hideTaskForm')
    //   // Hide Project Form
    //   this.$store.commit('hideProjectForm')

    //   // Toggle Project Form state
    //   this.$store.commit('toggleTeamForm', this.$store.getters.teamFormState)
    //   // if form showing/true
    //   if (this.$store.getters.teamFormState == true) {
    //     // if in view scroll up to top of page
    //     window.scrollTo(0, 0)
    //   }
    // },
    toggleSideBar () {
      // Toggle SideBar state
      this.$store.commit('toggleSideBar', this.$store.getters.sideBarState)
    },
  }
}
</script>

<style lang="css" scoped>
.add-btn-menu{
  padding: 7px;
    border-color: transparent;
    background-color: #007bff;
}
.logo-style{
  margin-top: -30px;
  color: #fff;
  font-family: 'Leckerli One', cursive;
  font-size: 25px;
}
.menu-icon-style{
  color: #fff;
  padding-top: 7px;
  padding-left: 6px;
  margin-bottom: -5px;
  font-size: 21px;
}
.top-bar-bg{
  background-color: #007bff;
  position: fixed;
  width: 100%;
  z-index: 99999;
  top:0px;
}
.btn-group-style{
 float:right;
 padding-right:10px;
 float: right;
 padding-right: 10px;
 position: relative;
 margin-top: -40px;
}
.c-white{
  color:#fff;
}
.menu-icon{
  width:30px;
}
</style>

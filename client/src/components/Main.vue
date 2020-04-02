<template>
  <div>
    <TopBar></TopBar>
    <!-- <SideBar v-on:projectOpen="projectOpen" v-on:loadAllTasks="loadAllTasks"></SideBar> -->
    <SideBar></SideBar>
    <div class="container margin">
      <Forms v-bind:projectId="currentProjectId"></Forms>
    </div>
    <h1>This is restricted to logged in users only </h1>
    <button @click="$store.dispatch('logout')">Logout</button>
  </div>
</template>

<script>
//import feathersClient from '@/feathers-client-config.js'
import TopBar from '@/components/layout/TopBar.vue'
import SideBar from '@/components/layout/SideBar.vue'
import Forms from '@/components/layout/Forms.vue'


export default {
  name: 'Main',
  data(){
    return{
      currentProjectId: null,
    }
  },
  components:{
    TopBar,
    SideBar,
    Forms
  },
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

<template>
  <div id="app">
    <router-view></router-view>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
//import Main from './components/Main.vue'
//import Footer from '@/components/layout/Footer.vue'

export default {
  name: 'App',
  components: {
   //Footer,
  },
  mounted(){
    //init data 
     this.$store.dispatch('fetchProjects').then((res) =>{
       console.log("App Vue: - Called fetchProjects", res);
       this.$store.commit('setLoading', false);
      });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>

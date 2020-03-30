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
  margin-top: 60px;
}

</style>

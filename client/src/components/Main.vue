<template>
  <div>
    <TopBar></TopBar>
    <div class="container">
      <Forms></Forms>
    </div>
    <h1>This is restricted to logged in users only </h1>
    <button @click="$store.dispatch('logout')">Logout</button>
    <Footer></Footer>
  </div>
</template>

<script>
//import feathersClient from '@/feathers-client-config.js'
import TopBar from '@/components/layout/TopBar.vue'
import Forms from '@/components/layout/Forms.vue'
//import Footer from '@/components/layout/Footer.vue'

export default {
  name: 'Main',
  components:{
    TopBar,
    Forms,
    // Footer,
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
</style>

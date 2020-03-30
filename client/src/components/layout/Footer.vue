<template>
<footer class="footer">
   <div class="container">
    <hr>
        <div class="row">
      <div class="col-12 text-center">
          <span class="logo-style">Staqpack</span>
      </div>
    </div>
    <div class="row">
     <div class="footer-nav col-12">
      <div class="link-wrap">
           <router-link to="/">Home</router-link>
      </div>
      <div class="link-wrap">
           <router-link to="/about">About</router-link>
      </div>
       <div class="link-wrap">
           <router-link to="/contact">Contact Us</router-link>
      </div>
      <div v-if="loggedIn" class="link-wrap">
          <span class="link" role="link" @click="$store.dispatch('logout')">Log Out</span>
      </div>
      <div v-else class="link-wrap">
           <router-link to="/login">Log In</router-link>
      </div>
     </div>
    </div>

    <div class="row">
      <div class="col-12 text-center">
          <span class="copyright-text"> Made with ❤️ in California  <span class="copyright-vr">|</span>  Staqpack Inc. &copy; {{ year }}</span>
      </div>
    </div>
  </div>
</footer>
</template>

<script>
export default {
  name: 'Footer',
  data(){
     return{
         loggedIn: null,
         year: new Date().getFullYear(),
     }
  },
  components:{

  },
  computed:{
  
  },
   mounted(){
    console.log('logged in footer', this.$store.getters.getUser)
    if(this.$store.getters.getUser){
        this.loggedIn = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer-nav{
    margin: 12.5px 0;
    font-size: 16px;
}
hr{
    margin: 0;
    padding-bottom: 10px;
}
.footer-nav .link-wrap{
    padding: 0 15px;
    display: inline-block;
}
.footer-nav .link-wrap:not(:last-child){
    border-right: 1px solid #ccc;
}
.logo-style{
    color: #007bff;
    font-size: 24px;
}
.footer{
  padding: 10px 0;
  bottom: 0;
  left: 0;
  position: absolute;
  width:100%;
}
.copyright-text{
    font-size: 13px;
}
.copyright-vr{
    font-size: 18px;
    vertical-align: middle;
    padding: 0 5px;
}
h3 {
  margin: 40px 0 0;
}
</style>

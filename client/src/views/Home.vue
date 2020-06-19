<template>
  <div class="home">
    <img alt="checklist" src="../assets/checklist.svg" />
    <h1>
      Welcome to
      <span class="logo-font">Staqpack</span>
    </h1>
    <div v-if="loggedIn">
      <router-link to="/app">
        Go To App
        <i class="la la-arrow-right"></i>
      </router-link>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/layout/Footer.vue";
export default {
  name: "Home",
  data() {
    return {
      loggedIn: null
    };
  },
  components: {
    Footer
  },
  mounted() {
    console.log("home", this.$store.getters.user);
    if (this.$store.getters.user) {
      this.loggedIn = true;
    }
  }
};
</script>
<style scoped>
img {
  max-width: 550px;
  width: 100%;
  margin: 25px 0;
}
.logo-font {
  font-size: 45px;
}
</style>
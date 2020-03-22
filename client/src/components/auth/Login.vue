<template>
  <div class="login container">
     <div class="card card-shadow">
       <form @submit.prevent="login" class="card-panel" style="padding:10px; margin:5px;">
         <h3 class="text-center">Login</h3>
         <hr />
         <div class="form-group">
           <label for="email"><b>Email:</b></label>
           <input class="form-control" type="email" name="email" placeholder="bob@burgers.com" v-model="email">
         </div>
         <div class="form-group">
           <label for="password"><b>Password:</b></label>
           <input class="form-control" type="password" name="password" placeholder="Your Super Secret Password" v-model="password">
         </div>
         <p v-if="feedback" class="red-text center">
           {{ feedback }}
         </p>
         <div class="form-group text-center">
          <button class="btn btn-primary btn-block"> Login </button>
         </div>
         <div class="text-center">
           <router-link to="/signup"><span class="grey-text">Don't have an account yet? Sign Up.</span></router-link>
         </div>
       </form>
     </div>
  </div>
</template>
<script>
import axios from 'axios';


  export default {
    name: 'Login',
    data(){
      return{
        email: null,
        password: null,
        feedback: null,
      }
    },
    methods: {
      login(){
        if(this.email && this.password){
           axios.post('http://localhost:3030/authentication/',{
               strategy: 'local',
               email: this.email,
               password: this.password

           }).then((res)=>{
                console.log(res);
                 this.$store.dispatch('setUser', res.data);
                 this.$router.push({name: 'Main'}) //once logged route to login

           }).catch((error)=>{
              console.log(error);
         });
        }
      }
    }
  }
</script>
<style>
.login{

  max-width: 400px;
  margin-top:60px;

}
.grey-text{
  color: #999;
}
.grey-text:hover{
  color: #999;
  text-decoration: underline;
}
.login h3 {
  font-size: 2em;
}

.card-shadow{
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}
.card-shadow:hover{
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  transition-property: transform;
  transition-timing-function: ease;
  transition-duration: 0.3s;
  transform: scale(1.015 , 1.015);
}
</style>

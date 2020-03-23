<template lang="html">
  <div class="signup container">
    <!--Import Google Icon Font-->


      <div class="col-xs-12">
        <form class="card card-shadow" @submit.prevent="signup" style="padding:10px; margin:5px;">
              <h3 class="text-center"> Sign Up</h3>
              <hr />
            <div class="form-group">
              <label for="email"><b>Email:</b></label>
              <input type="email" class="form-control"  name="email" placeholder="bob@burgers.com" v-model="email">
            </div>
            <div class="form-group">
              <label for="password"><b>Password:</b></label>
              <input type="password" class="form-control"  name="password" placeholder="Super Secret Password" v-model="password">
            </div>
            <!-- <div class="form-group">
              <label for="alias"><b>Username:</b></label>
              <input type="text" class="form-control" name="username" placeholder="burgerbob" v-model="username">
            </div> -->


            <div class="form-group text-center">
              <button class="button btn btn-primary btn-block"> Sign Up</button>
           </div>
           <div class="text-center">
             <router-link to="/login"><span class="grey-text">Already have an account? Login.</span></router-link>
           </div>
       </form>
      </div>
  </div>
</template>

<script>

//import feathersClient from '../../../feathers-client-config.js'

import axios from 'axios';

export default {
  name: 'SignUp',
  data() {
    return {
      email: null,
      password: null,
      //username: null,
      slug: null,
      output: null
    }
  },
  methods: {
    signup() {
    if(this.email && this.password ){
       axios.post('http://localhost:3030/users', {
           email: this.email,
           password: this.password
       }).then((res) =>{
           console.log('Created User:', res)
          this.$store.dispatch('authenticateUser', { 
              strategy: 'local',
              email: this.email, 
              password: this.password
         });
       }).catch((err) => {
           console.log(err);
       })
     }
    }
  }
}
</script>

<style>
.signup {
  margin-top: 60px;
  max-width: 400px;
}

.signup h3 {
  font-size: 2em;
}

.signup .field {
  margin-bottom: 16px;
}

.card-shadow {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.card-shadow:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition-property: transform;
  transition-timing-function: ease;
  transition-duration: 0.3s;
  transform: scale(1.015, 1.015);
}

.grey-text {
  color: #999;
}

.grey-text:hover {
  color: #999;
  text-decoration: underline;
}
</style>

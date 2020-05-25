<template>
 <div class=""><!-- componenet wrapper -->
 
     <div class="form-section">
         <div class="row no-gutter">
           <h4>Git Settings</h4>
         </div>     
         <form action="#" @submit.prevent>
           <div class="row margin-top-15">
             <div class="col-sm-4 col-12 margin-top-10">
               <label>Github Username</label>
               <input type="text" class="form-control" v-model="githubUsername" placeholder="archer51">
             </div>
             <div class="col-sm-6 col-12 margin-top-10">
               <label>Github Token</label>
               <input type="text" class="form-control" v-model="githubToken"  placeholder="s23b483d132424c5254763798a726cad88n86344k591">
             </div>
             <div class="col-sm-2 col-12 margin-top-10">
               <button class="btn btn-block btn-secondary save-btn" @click="saveGithubSettings()">Save</button>
             </div>
           </div>
         </form>
     </div>
     <!-- <div v-if="$store.getters.gitFormState == true">
       <GitForm></GitForm>
     </div> -->
     <div class="repo-section">
         <div class="row no-gutter">
           <h4>Repositories</h4>
           <i :class="{'repo-toggle-icon':true, 'fa': true, 'fa-angle-down': reposHidden, 'fa-angle-up': !reposHidden}" role="button" @click="toggleReposVisibility()"></i>
         </div>
        <transition name="fade">
          <div class="margin-top-10 row" v-if="repos != null &&  reposHidden === false">
           <template v-for="repo in repos">
             <GitCard v-bind:repoData="repo" :key="repo"></GitCard>
           </template>
          </div>
        </transition>   
     </div>
  </div> <!-- end componenet wrapper -->
</template>

<script>

import axios from 'axios'
import GitCard from '@/components/settings/git/GitCard.vue'
// import GitForm from '@/components/settings/GitForm.vue'


export default {
  name: 'GitSettings',
  data(){
    return {
      sliceStrFeat: null,
      sliceStrTodo: null,
      githubUsername: null,
      githubToken: null,
      commitFeatArray: [],
      commitTodoArray: [],
      reposHidden: true,
    }
  },
  components: {
    GitCard,
    // GitForm
  },
  methods: {
      toggleReposVisibility(){
        this.reposHidden = !this.reposHidden;
      },
    prepString(str){

      let newStr =  str.toLowerCase();
      newStr = newStr.replace(/\s/g,'');
      return newStr;
    },
    getRepos(url, token){
      // let username = "";
      // let password = "";
      // let auth = btoa(username + ":" + password);
      var that = this;

      const headers = {
          "Content-Type": "application/json",
          "Authorization" : 'Token '+ token
      }
      axios({
        method: 'get',
        url: url,
        headers: headers,
        // auth: { //this works, and auth by token was working but stopped ? -- look into it ?
        //   username: 'username_here',
        //   password: 'password_here'
        // }
      }).then(function(response){
        console.log("Axios Data: ", response.data);
        let data = response.data;
        that.repos = {};
        for (var key in data){

          let commitUrl = "https://api.github.com/repos/"+data[key].owner.login+"/"+data[key].name+"/commits";

          that.repos[key] = {
                       id: data[key].id,
                       name: data[key].name,
                       full_name: data[key].full_name,
                       repo_url: data[key].html_url,
                       description: data[key].description,
                       owner: data[key].owner.login,
                       avatar_url: data[key].owner.avatar_url,
                       commits_url: commitUrl,
                       private: data[key].private,
                     };

        } // END FOR LOOP

        console.log("repo array: ", that.repos);
      });

   },
  async getCommits(commitsUrl, token) {
       // const username = ""
       // const password = ""
       // const headers = {
       //     "Authorization" : `Basic ${btoa(`${username}:${password}`)}`
       // }

       const headers = {
           "Authorization" : "Token "+ token
       }
       const url = commitsUrl;
       const response = await fetch(url, {
           "method": "GET",
           "headers": headers
       })
       const result = await response.json();

       //===================================
       // Testing With Console console.log
       //===================================

       console.log("Commits Response:", JSON.stringify(result));

     //  Cycles Through All commits then checks if commit has keywords if so, it slices and lowers the messages to be stored and compared tocard titles(feats) and card todos

       for(var i in result){

         console.log("Most Recent Commit Message "+i+" :", JSON.stringify(result[i].commit.message));
         // let lastCommit = result[i].commit.message;

         this.sliceStrFeat = null;  //re-initlize
         this.sliceStrTodo = null;  //re-initlize

         this.commitMessageSearch(result[i].commit.message);

             if(this.sliceStrFeat != null){
               console.log("PrepString Feat "+i+" : ",this.prepString(this.sliceStrFeat));
               //Input Into Feat Array
                this.commitFeatArray.push(this.prepString(this.sliceStrFeat));
             }

             if(this.sliceStrTodo != null){
                 console.log("PrepString Todo "+i+" : ",this.prepString(this.sliceStrTodo));

                 //Input into Todo Array
                 this.commitTodoArray.push(this.prepString(this.sliceStrTodo));
             }
       } //END FOR LOOP


       if(this.commitTodoArray){
         console.log("Todo Array: ",JSON.stringify(this.commitTodoArray));
       }
       if(this.commitFeatArray){
         console.log("Feat Array: ", JSON.stringify(this.commitFeatArray));
       }
       return result;
   },
   commitMessageSearch(commit){
     var searchForFeat = commit.search('@feat:');
     var searchForTodo = commit.search('@todo:');

     //=======================================
     // Search for feat in commit Message
     //=======================================

     if(searchForFeat != -1 && searchForTodo == -1){
       console.log("Match! Feat Position:", searchForFeat);

       this.sliceStrFeat = commit.slice(this.addToString(searchForFeat, 6));


     }
     //=======================================
     // Search for todo in commit message
     //=======================================
     else if(searchForTodo != -1 && searchForFeat == -1){

       console.log("Match! Todo Position:", searchForTodo);
        this.sliceStrTodo = commit.slice(this.addToString(searchForTodo, 6));

     }
     //=======================================
     // If todo and Feat are in one commit
     //=======================================
     else if(searchForTodo != -1 && searchForFeat != -1){

           console.log("Match! Todo Position:", searchForTodo);
           console.log("Match! Feat Position:", searchForFeat);

      // If @todo: comes before @feat:
        if( searchForTodo < searchForFeat){

          this.sliceStrFeat = commit.slice(this.this.addToString(searchForFeat, 6));
          this.sliceStrTodo = commit.slice(this.this.addToString(searchForTodo, 6), searchForFeat);

        }
         // If @todo: comes after @feat:
        else{
          this.sliceStrFeat = commit.slice(this.this.addToString(searchForFeat, 6), searchForTodo);
          this.sliceStrTodo = commit.slice(this.this.addToString(searchForTodo, 6));
        }

     }

     //=======================================
     // Console Log no match
     //=======================================

     if(searchForTodo == -1 && searchForFeat == -1) {

       var searchForFeat1 = commit.search('@feat');
       var searchForTodo1 = commit.search('@todo');

       if(searchForTodo1 != -1 || searchForFeat1 != -1){
          console.log("You are missing the, : from @feat: or @todo:")
       }
       else {
           console.log("No Match!");
       }

     }
   },
   saveGithubSettings(){

    //store like theme also in DB, but fo rnow use local storage
    localStorage.setItem('githubtoken', this.githubToken);
    localStorage.setItem('githubusername', this.githubUsername);
     // TO DO:
     // POST WITH AJAX TO ENDPOINT
     // THEN SHOW REPOS


     //this.getRepos("https://api.github.com/user/repos?visibility=all", this.githubToken);
   },
   syncRepo(index){
     console.log("Sync: ", this.repos[index]);
     console.log("Sync Commit URl: ", this.repos[index].commits_url);

     // getCommits(repos[index].commits_url, "sdfsdfsdffjslfjsdfljfsdfwf");
   },
   addToString(searchNum, num){
      return  searchNum + num;
   },
  },
  mounted(){
    //for testing purposes only remove after, and save key or have user sign in using another method
    // this.getRepos("https://api.github.com/user/repos?visibility=all", localStorage.getItem('githubToken'));
    this.getRepos("https://api.github.com/user/repos?visibility=all", process.env.VUE_APP_GITHUB_TOKEN);
  }
}
</script>


<style lang="css">
   .no-gutter{
       margin-left: 0;
       margin-right: 0;
   }
   .repo-toggle-icon{
       margin-left:auto; 
       font-size: 22px;
   }
  .form-section{
    margin-top:35px;
    margin-bottom: 35px;
  }
  .margin-top-15{
    margin-top:15px;
  }
  .margin-top-10{
    margin-top:10px;
  }
  .repo-section {
    margin-top:50px;
    margin-bottom: 50px;
  }
  .save-btn {
   top:30px;
   position:relative;
  }
  h4{
      font-weight: 300;
  }
</style>

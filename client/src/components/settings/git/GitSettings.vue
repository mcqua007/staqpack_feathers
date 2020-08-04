<template>
  <div class>
    <!-- componenet wrapper -->

    <div class="form-section">
      <div class="row no-gutter">
        <h4>Git Settings</h4>
      </div>
      <form action="#" @submit.prevent>
        <div class="row margin-top-15">
          <!-- <div class="col-sm-4 col-12 margin-top-10">
            <label>Github Username</label>
            <input type="text" class="form-control" v-model="githubUsername" placeholder="archer51" />
          </div> -->
          <div class="col-sm-10 col-12 margin-top-10">
            <label>Github Token</label>
            <input
              type="text"
              class="form-control"
              v-model="githubToken"
              placeholder="s23b483d132424c5254763798a726cad88n86344k591"
            />
          </div>
          <div class="col-sm-2 col-12 margin-top-10">
            <button class="btn btn-block btn-secondary save-btn" @click="saveGithubSettings()">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="repo-section">
      <div class="row no-gutter">
        <h4>Repositories</h4>
        <i
          :class="{
            'repo-toggle-icon': true,
            la: true,
            'la-angle-down': reposHidden,
            'la-angle-up': !reposHidden,
          }"
          role="button"
          @click="toggleReposVisibility()"
        ></i>
      </div>
      <transition name="fade">
        <div class="margin-top-10 row" v-if="repos != null && reposHidden === false">
          <template v-for="repo in repos">
            <GitCard v-bind:repoData="repo" :key="repo.repoId"></GitCard>
          </template>
        </div>
      </transition>
    </div>
  </div>
  <!-- end componenet wrapper -->
</template>

<script>
  import axios from 'axios';
  import GitCard from '@/components/settings/git/GitCard.vue';
  // import GitForm from '@/components/settings/GitForm.vue'

  export default {
    name: 'GitSettings',
    data() {
      return {
        sliceStrFeat: null,
        sliceStrTodo: null,
        githubUsername: null,
        githubToken: null,
        commitFeatArray: [],
        commitTodoArray: [],
        reposHidden: true,
      };
    },
    components: {
      GitCard,
      // GitForm
    },
    methods: {
      toggleReposVisibility() {
        this.reposHidden = !this.reposHidden;
      },
      getRepos(url, token) {
        // let username = "";
        // let password = "";
        // let auth = btoa(username + ":" + password);
        var that = this;

        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + token,
        };
        axios({
          method: 'get',
          url: url,
          headers: headers,
          // auth: { //this works, and auth by token was working but stopped ? -- look into it ?
          //   username: 'username_here',
          //   password: 'password_here'
          // }
        }).then(function(response) {
          console.log('Axios Data: ', response.data);
          let data = response.data;
          that.repos = {};
          for (var key in data) {
            let commitUrl = 'https://api.github.com/repos/' + data[key].owner.login + '/' + data[key].name + '/commits';

            that.repos[key] = {
              repoId: data[key].id,
              name: data[key].name,
              fullName: data[key].full_name,
              repoUrl: data[key].html_url,
              description: data[key].description,
              owner: data[key].owner.login,
              avatarUrl: data[key].owner.avatar_url,
              hooksUrl: data[key].hooks_url,
              commitsUrl: commitUrl,
              private: data[key].private,
            };
          } // END FOR LOOP

          console.log('repo array: ', that.repos);
        });
      },
      saveGithubSettings() {
        //store like theme also in DB, but for now use local storage
        localStorage.setItem('githubtoken', this.githubToken);
        localStorage.setItem('githubusername', this.githubUsername);
        // TO DO:
        // POST WITH AJAX TO ENDPOINT
        // THEN SHOW REPOS

        //this.getRepos("https://api.github.com/user/repos?visibility=all", this.githubToken);
      },
    },
    mounted() {
      //for testing purposes only remove after, and save key or have user sign in using another method
      // this.getRepos("https://api.github.com/user/repos?visibility=all", localStorage.getItem('githubToken'));
      this.getRepos('https://api.github.com/user/repos?visibility=all', process.env.VUE_APP_GITHUB_TOKEN);
    },
  };
</script>

<style lang="css">
  .no-gutter {
    margin-left: 0;
    margin-right: 0;
  }
  .repo-toggle-icon {
    margin-left: auto;
    font-size: 22px;
  }
  .form-section {
    margin-top: 35px;
    margin-bottom: 35px;
  }
  .margin-top-15 {
    margin-top: 15px;
  }
  .margin-top-10 {
    margin-top: 10px;
  }
  .repo-section {
    margin-top: 50px;
    margin-bottom: 50px;
  }
  .save-btn {
    top: 30px;
    position: relative;
  }
  h4 {
    font-weight: 300;
  }
</style>

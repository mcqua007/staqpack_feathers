<template lang="html">
  <div class="card-wrap col-sm-12 col-md-6 col-lg-4">
    <!-- Component Wrapper -->
    <div class="card">
      <div class="card-body">
        <div class="card-title git-title">
          {{ repoData.name }}
          <a href="data" target="_blank" class="push-right">
            <i class="la la-external-link"></i>
          </a>
        </div>
        <img class="github-avatar-img" v-bind:src="repoData.avatarUrl" />
        <span style="color: #777;"> &nbsp;{{ repoData.owner }}</span>
        <div class="card-text" v-if="repoData.description">{{ repoData.description }}</div>
        <div class="card-text" v-else>No description available</div>
        <span v-if="repoData.private" class="badge pull-left visibility-badge">Private</span>
        <span v-if="repoData.private == false" class="badge pull-left visibility-badge">Public</span>
        <button
          :class="{ 'btn-secondary': true, 'sync-button': true, active: isSyncing }"
          data-index="key"
          @click="syncRepo(repoData)"
        >
          <i class="la la-sync"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GitDefault',
    props: ['repoData'],
    data() {
      return {
        confirmSync: null,
        isSyncing: false,
      };
    },
    methods: {
      syncRepo(data) {
        this.isSyncing = true;
        console.log('data: ', data); //eventually allow user to edit thigns before creation
        this.$store.dispatch('createGithubRepoProject', data).then(() => {
          //do something here once done
          // alert("New Project created!");
          //add webhook
          const json = {
            'name': 'web',
            'active': true,
            'events': ['push'],
            'config': {
              'url': 'http://cacd9cb9cab1.ngrok.io/githubwebhooks/',
              'content_type': 'json',
            },
          };
          let webhookJson = {
            json: json,
            token: process.env.VUE_APP_GITHUB_TOKEN,
            url: data.hooksUrl,
          };
          console.log('webhookJSON: ', webhookJson);
          this.$store.dispatch('createGithubWebhook', webhookJson).then(() => {
            //do something after webhook is created
          });
        });

        //this.$store.commit("setCurrentGitFormData", index);
        //this.$store.commit("toggleGitForm", this.$store.getters.gitFormState);
        //scroll to top of site

        window.scrollTo(0, 0);
        // console.log("Sync Commit URl: ", repos[index].commits_url);
        // getCommits(repos[index].commits_url, "GITHUB_TOKEN");
      },
    },
    mounted() {},
  };
</script>

<style lang="css" scoped>
  .git-title {
    font-size: 19.5px;
    font-weight: 600;
    text-transform: capitalize;
    width: 100%;
  }
  .push-right {
    float: right;
  }
  .card-wrap {
    padding: 7px;
  }
  .card-text {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .sync-button {
    float: right;
    margin-top: 8px;
    border-radius: 5px;
    color: #fff;
    border: none;
  }
  .visibility-badge {
    background-color: #c7c7c7;
    color: #fff;
    margin-top: 15px;
    padding: 5px 7px;
  }
  .github-avatar-img {
    width: 100%;
    max-width: 30px;
    margin-bottom: 15px;
    margin-top: 9px;
    margin-right: 5px;
  }
  .github-avatar-img {
    width: 100%;
    max-width: 30px;
    margin-bottom: 15px;
    margin-top: 9px;
    margin-right: 5px;
  }
  .sync-button.active i {
    -webkit-animation: spin 4s linear infinite;
    -moz-animation: spin 4s linear infinite;
    animation: spin 4s linear infinite;
  }
  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>

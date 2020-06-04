<template lang="html">
 <div class="card-wrap col-sm-12 col-md-6 col-lg-4"><!-- Component Wrapper -->
  <div class="card">
    <div class="card-body">
    <span class="card-title git-title">{{ repoData.name }}<a href="data" target="_blank" class="pull-right"><i class="fa fa-external-link"></i></a></span><br />
    <img class="github-avatar-img" style="width:100%; max-width:30px;margin-bottom: 15px; margin-top:9px;margin-right:5px;" v-bind:src="repoData.avatar_url" />
    <span style="color: #777;"> &nbsp;{{ repoData.owner }}</span>
    <div class="card-text">{{ shortDesc(repoData.description) }}</div>
      <span v-if="repoData.private" class="badge pull-left visibility-badge">Private</span>
      <span v-if="repoData.private == false" class="badge pull-left visibility-badge">Public</span>
      <button class="btn-secondary sync-button" data-index="key" @click="syncRepo(repoData)"><i class="fas fa-sync"></i></button>
    </div>
   </div>
  </div>
</template>

<script>

export default {
  name: 'GitDefault',
  props:['repoData'],
  data () {
    return {
      confirmSync: null,
    }
  },
  methods: {
    shortDesc(data){
      //===========================================
      // Repo Description - Limiting the Characters
      //===========================================

        let repoDesc = "";
        if(data != null){
                  repoDesc = data;
                  if(repoDesc.length > 40) {
                    repoDesc = repoDesc.substring(0,35);
                    repoDesc += "...";
                }

        }
        else {
                repoDesc =  "No description available";
         }
      return repoDesc;
    },
    syncRepo(index){
       console.log("Sync: ", index);

       this.$store.commit("setCurrentGitFormData", index);
       this.$store.commit("toggleGitForm", this.$store.getters.gitFormState);
       //scroll to top of site
       window.scrollTo(0,0);
      // console.log("Sync Commit URl: ", repos[index].commits_url);
      // getCommits(repos[index].commits_url, "GITHUB_TOKEN");
    },
  },
  mounted(){

  }
}
</script>

<style lang="css" scoped>
.git-title{
  font-size: 19.5px;
  font-weight: 600;
  text-transform: capitalize;
}
.card-wrap{
 padding:7px;
}
.sync-button {
 float: right;
 margin-top:8px;
 border-radius:5px;
 color:#fff;
}
.visibility-badge{
  background-color: #c7c7c7;
  color: #fff;
  margin-top:15px;
  padding: 5px 7px;
}
.github-avatar-img{
  width:100%;
  max-width:30px;
  margin-bottom: 15px;
  margin-top:9px;
  margin-right:5px;
}
</style>

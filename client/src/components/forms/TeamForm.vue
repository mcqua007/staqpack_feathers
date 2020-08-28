<template>
  <transition name="fade">
    <div v-show="$store.getters.teamFormState == true" class="jumbotron">
      <i class="la la-times close" role="button" @click="hideTeamForm()"></i>
      <h3 style="margin-bottom: 25px;">Add New Member</h3>
      <form @submit.prevent>
        <div class="row">
          <div class="col-12 col-md-4">
            <input class="form-control" type="email" v-model="email" placeholder="email@example.com" />
          </div>
          <div class="col-12 col-md-4">
            <select class="form-control" v-model="chosenProject">
              <option value="default">[Choose Project]</option>
              <option v-for="project in projects" :value="project._id" :key="project.name">{{ project.name }}</option>
            </select>
          </div>
          <div class="col-12 col-md-4"><button class="btn btn-primary btn-block">Add Member</button></div>
        </div>
      </form>
    </div>
  </transition>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'TeamForm',
    data() {
      return {
        email: null,
        projects: null,
        chosenProject: 'default'
      };
    },
    methods: {
      hideTeamForm() {
        this.$store.commit('toggleTeamForm', this.$store.getters.teamFormState);
      }
    },
    computed: mapState(['loading']),
    watch: {
      loading(newValue) {
        if (newValue === false) {
          this.projects = this.$store.getters.projects;
        }
      },
      $route() {
        if (this.$route.name == 'Project') {
          this.projectId = this.$route.params.id; //refering to project id
        }
      }
    },
    created() {
      //make taskForm select option the same as the project it is in
      if (this.$route.name == 'Project') {
        this.projectId = this.$route.params.id; //refering to project id
      }
    }
  };
</script>
<style lang="css" scoped>
  .red-text {
    color: red;
  }

  /* USED IN MAIN OTHER COMPONENS - MAIN *NOT DRY */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .form-group {
    text-align: left;
  }
  .flex-end {
    align-items: flex-end;
  }
  .jumbotron {
    padding: 30px 20px;
  }
  .close {
    float: right;
    font-size: 30px;
    color: #ccc;
    position: relative;
  }
</style>

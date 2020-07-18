<template>
  <div class="project">
    <div class="project-header-bar">
      <div class="project-title">
        <div class="text-left">
          <h3>{{ name }}</h3>
        </div>
      </div>
      <button class="delete-project-btn" @click="deleteProject()">
        <i class="la la-trash delete-project-icon"></i>
      </button>
    </div>
    <hr />
    <div class="row">
      <template v-for="task in tasks">
        <TaskCard v-bind:task="task" :key="task._id"></TaskCard>
      </template>
    </div>
  </div>
  <!-- end componenet wrapper -->
</template>

<script>
  import TaskCard from "@/components/TaskCard.vue";
  import feathersClient from "@/feathers-client-config.js";
  //import { mapState } from 'vuex';

  export default {
    name: "Project",
    components: {
      TaskCard,
    },
    //props: ['responseData'],
    data() {
      return {
        //id: this.$route.params.id,
      };
    },
    methods: {
      deleteProject() {
        let project_name = this.$route.params.name;
        let confirmed = confirm(
          "Permanently delete '" + project_name + "' and its associated tasks ?"
        );
        if (confirmed) {
          this.$store.dispatch("deleteProject", this.$route.params.id).then(() => {
            this.$router.push({
              name: "AllTasks",
            });
          });
        }
      },
    },
    computed: {
      tasks() {
        console.log("Computed - allTasks Getters: ", this.$store.getters.allTasks);
        let currentTasks = this.$store.getters.allTasks.filter(
          (task) => task.projectId == this.$route.params.id
        );
        console.log("Computed curentTasks: ", currentTasks);
        return currentTasks;
      },
      name() {
        //tried to filter allTasks like above but didn't work
        // let project = this.$store.getters.projects.filter(
        //   (project) => project._id == this.$route.params.id
        // );

        return this.$route.params.name;
      },
    },
    created() {
      console.log("Project Created: ", this.$route.params.id);
      //this is not working any more when a new class is created
      //probably move some where else. This will see if another user adds a task then would be piped to this project

      // feathersClient.service("tasks").on("created", (newTask) => {
      //   console.log("On created Task: ", newTask);
      //   if (this.$route.params.id === newTask.projectId){
      //     this.tasks.push(newTask);
      //     this.$store.commit('ADD_TASKS', newTask);
      //   }
      // });
      //not doing anything was trying to test
      feathersClient
        .service("tasks")
        .on("removed", (message) => console.log("task removed - message", message));
    },
  };
</script>

<style lang="css" scoped>
  .project-header-bar {
    display: inline-flex;
    align-items: center;
    width: 100%;
  }
  .delete-project-btn {
    margin-left: auto;
    font-size: 25px;
    background: transparent;
    border: none;
    color: #dc3545;
  }

  /* USED IN MAIN OTHER COMPONENS - MAIN *NOT DRY */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  /*================================*/
</style>

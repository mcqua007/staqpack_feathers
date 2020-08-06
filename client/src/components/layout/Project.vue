<template>
  <div class="project">
    <div class="project-header-bar">
      <div class="project-title">
        <div class="text-left">
          <h3>{{ name }}</h3>
        </div>
      </div>
      <select class="form-control sort-select" v-model="sortVal" @change="sortTasks">
        <option value="new">Newest Tasks</option>
        <option value="old">Old Tasks</option>
        <option value="high">Highest Priority</option>
        <option value="low">Lowest Priority</option>
      </select>
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
  import TaskCard from '@/components/TaskCard.vue';
  import feathersClient from '@/feathers-client-config.js';
  //import { mapState } from 'vuex';

  export default {
    name: 'Project',
    components: {
      TaskCard,
    },
    data() {
      return {
        sortVal: 'new',
      };
    },
    methods: {
      sortTasks() {
        this.$store.commit('SORT_TASKS', this.sortSwitch(this.sortVal));
      },
      sortSwitch(val) {
        switch (val) {
          case 'new':
            return {
              sortBy: 'createdAt',
              ascending: false,
            };
          case 'old':
            return {
              sortBy: 'createdAt',
              ascending: true,
            };

          case 'high':
            return {
              sortBy: 'severity',
              ascending: false,
            };
          case 'low':
            return {
              sortBy: 'severity',
              ascending: true,
            };
        }
      },
    },
    computed: {
      tasks() {
        let currentTasks = this.$store.getters.allTasks.filter((task) => task.projectId == this.$route.params.id);
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
      console.log('Project Created: ', this.$route.params.id);
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
      feathersClient.service('tasks').on('removed', (message) => console.log('task removed - message', message));
    },
  };
</script>

<style lang="css" scoped>
  .project-header-bar {
    display: inline-flex;
    align-items: center;
    width: 100%;
  }
  .sort-select {
    max-width: 160px;
    margin-left: auto;
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

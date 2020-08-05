<template>
  <div class="project">
    <!-- componenet wrapper -->
    <div class="project-header-bar">
      <div class="project-title">
        <div class="text-left">
          <h3>All Tasks</h3>
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
  //import feathersClient from "@/feathers-client-config.js";
  //import { mapState } from 'vuex';

  export default {
    name: 'AllTasks',
    components: {
      TaskCard,
    },
    //props: ['responseData'],
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
        return this.$store.getters.allTasks;
      },
    },
    created() {
      // feathersClient.service("tasks").on("created", (newTask) => {
      //   this.tasks.push(newTask);
      // });
    },
    mounted() {},
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

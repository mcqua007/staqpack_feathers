<template>
  <div class="project">
    <!-- componenet wrapper -->
    <div class="project-header-bar">
      <div class="project-title">
        <div class="text-left">
          <h3>All Tasks</h3>
        </div>
      </div>
      <TaskSort></TaskSort>
    </div>
    <hr />
    <div class="text-left">Completed: {{ totalCompletedTasks }}</div>
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
import TaskSort from "@/components/TaskSort.vue";
//import feathersClient from "@/feathers-client-config.js";
//import { mapState } from 'vuex';

export default {
  name: "AllTasks",
  components: {
    TaskCard,
    TaskSort
  },
  //props: ['responseData'],
  data() {
    return {};
  },
  methods: {},
  computed: {
    tasks() {
      return this.$store.getters.allTasks;
    },
    totalCompletedTasks() {
      return this.$store.getters.allTasks.filter(
        task => task.completed === true
      ).length;
    }
  },
  created() {
    // feathersClient.service("tasks").on("created", (newTask) => {
    //   this.tasks.push(newTask);
    // });
  },
  mounted() {}
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

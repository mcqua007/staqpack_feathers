<template>
  <div class="push-left">
    <select class="form-control sort-select" v-model="sortVal" @change="sortTasks">
      <option value="oldest">Old Tasks</option>
      <option value="newest">Newest Tasks</option>
      <option value="high">Highest Priority</option>
      <option value="low">Lowest Priority</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'TaskSort',
    data() {
      return {
        sortVal: 'oldest',
      };
    },
    methods: {
      sortTasks() {
        this.$store.commit('SORT_TASKS', this.sortSwitch(this.sortVal));
      },
      sortSwitch(val) {
        switch (val) {
          case 'newest':
            return {
              sortBy: 'createdAt',
              ascending: false,
            };
          case 'oldest':
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
  };
</script>

<style scoped>
  .push-left {
    margin-left: auto;
  }
  .sort-select {
    max-width: 160px;
  }
</style>

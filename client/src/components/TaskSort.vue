<template>
  <div class="push-left">
    <select class="form-control sort-select" v-model="sortVal" @change="sortTasks">
      <option value="old">Old Tasks</option>
      <option value="new">Newest Tasks</option>
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
        sortVal: 'old',
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

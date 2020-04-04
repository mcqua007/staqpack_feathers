<template lang="html">
  <div v-if="todo != null">
    <div style='width:100%;'>
      <div class='form-check'>
            <!-- <input type='checkbox' :checked="!todo.open" data-checked='false'  @change="toggleCheckBox(todo._id)" class="form-check-input" v-bind:disabled="!taskOpen"> -->
        <input type='checkbox' :checked="todo.completed" data-checked='false'  @change="toggleCheckBox(todo._id)" class="form-check-input">
        <label class='form-check-label' v-bind:todo-id="todo._id">{{todo.name}}</label>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TodoList',
  props:['todo', 'taskOpen'],
  data(){
    return {
     checkedState: null,
    }
  },
  methods: {
    toggleCheckBox(id){
      var taskId = id;

      this.checkedState = !this.todo.completed;
      //changed - todo data with dispatch action to update DB
      console.log("open state: ", this.checkedState, taskId);

    }
  },
  mounted(){
  }
}
</script>

<style lang="css" scoped>
</style>

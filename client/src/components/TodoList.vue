<template lang="html">
  <div v-if="todo != null" class="todo" :style="todoStyle">
    <div style='width:100%;'>
      <div class='form-check' v-if="!editInputState">
            <!-- <input type='checkbox' :checked="!todo.open" data-checked='false'  @change="toggleCheckBox(todo._id)" class="form-check-input" v-bind:disabled="!taskOpen"> -->
        <input type='checkbox' :checked="todo.completed" data-checked='false'  @change="toggleCheckBox(todo._id)" class="form-check-input">
        <label class='form-check-label todo-name' v-bind:todo-id="todo._id">{{todo.name}}</label>
        <i class="fa fa-edit edit-todo" role="button" @click="toggleEditTodo(todo.name)"></i>
      </div>
      <div class='edit-todo-row' v-else>
        <input class='form-check-label' type="text" v-model="editInput" v-on:keyup="checkChange(todo.name)"/>
        <i :class="{'fa': true, 'fa-check': (todoChange === true), 'fa-times': (!todoChange)}" role="button" @click="saveTodoEdit(todo._id, todo.name)"></i>
        <i class="fa fa-trash edit-todo-delete" role="button" @click="deleteTodo(todo._id)"></i>
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
     editInputState: false,
     editInput: null,
     todoChange: false,
     todoStyle: null,
    }
  },
  methods: {
    toggleEditTodo(todo){
        this.editInputState  = !this.editInputState;

        if(todo){
            this.editInput = todo;
        }
    },
    checkChange(todo){
        if(this.editInput != todo){
            this.todoChange = true;
        }else{
            this.todoChange = false;
        }
    },
    toggleCheckBox(id){
      var taskId = id;

      this.checkedState = !this.todo.completed;
      //changed - todo data with dispatch action to update DB
      console.log("open state: ", this.checkedState, taskId);

    },
    saveTodoEdit(id, original_todo){
        if(this.editInput != original_todo){
          //save todo in DB
          console.log("saave id: ", id);
          this.$store.dispatch('patchTodo', {id: id, update: {name: this.editInput}}).then(()=>{
              document.querySelector('.todo-name').innerHTML = this.editInput;
              this.todoChange = false;
          });
        }else{
          //toggle todo edit state
          this.toggleEditTodo();
        }
    },
    deleteTodo(id){
        this.$store.dispatch('deleteTodo', id).then(()=>{
          this.todoStyle = {'display': 'none'};
        }).catch((e) =>{
            console.log("Delte Error: ", e);
        })
    }
  },
  mounted(){
  }
}
</script>

<style lang="css" scoped>
.form-check{
    display: inline-flex;
    width:100%;
}
.form-check i{
    opacity: 0;
    transition: opacity .225s linear;
}
.form-check:hover i{
   opacity: 1;
}
i.fa-edit{
    margin-left:auto;
    color: #6c757d;
}
i.fa-times{
     color: #6c757d;
}
i.fa-check{
    color: #28a745;
}
i.edit-todo-delete{
    color: #dc3545;
    margin-left: 5px;
}
.edit-todo-row{
 display:inline-flex;
 align-items: center;
 width:100%;
}
.edit-todo-row input[type="text"]{
    border: none;
    border-bottom: 1px solid #ced4da;
    width: 100%;
    margin-bottom: 7.5px;
}
</style>

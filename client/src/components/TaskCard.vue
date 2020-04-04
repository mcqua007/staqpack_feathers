<template lang="html">
  <div class="col-12 col-sm-6 col-lg-4 animated task-wrap">
    <div v-if="task != null">
      <div class='col-xs-12 card card-shadow'>
        <div class='btn-group' role='group'>
        <button type='button' v-bind:class="{'btn':true, 'btn-outline-primary':true}"  :disabled="task.completed"><i class='fa fa-calendar'></i></button>
        <button type='button' v-bind:class="{'btn':true, 'btn-outline-danger':true}"  :disabled="task.completed"><i class="far fa-images"></i></button>
      <div class='btn-group'>
        <button class='btn btn-outline-secondary'   aria-haspopup='true' @click="toggleDropdown()"> <i :class="{'fa':true, 'fa-angle-down':(!dropdownExpanded), 'fa-angle-up':(dropdownExpanded)}"></i> </button>
        <div v-if="dropdownExpanded" :class="{'dropdown-menu':true,'dropdown-menu-right': true, 'active':(dropdownExpanded == true)}" >
        <button class='dropdown-item' type='button' style='display:none;'> <i class='fa fa-arrow-left' style='margin-right:5px;'></i>Go Back</button>  
         <div v-if="task.completed === false">
          <button class='dropdown-item' type='button' @click="completeTask(task.id)"> 
           <i class='fa fa-check' style='margin-right:5px;'></i>Completed
          </button>
         </div>
         <div v-else>
           <button class='dropdown-item' type='button'  @click="reopenTask(task.id)"> 
            <i class='fa fa-undo' style='margin-right:5px;'></i>Re-open
          </button>
         </div>  
        <button class='dropdown-item' type='button'  @click='toggleTodoVisibility()'>          
         <div v-if="todosHidden">
          <i class='fa fa-eye' style='margin-right:5px;'></i>Show Todos
         </div>
         <div v-else>
           <i class='fa fa-eye-slash' style='margin-right:5px;'></i>Hide Todos
         </div>      
        </button>
        <button class='dropdown-item' type='button' v-bind:data-delete-btn-id="task.id" @click="deleteTask(task.id)"> <i class='fa fa-trash' style='margin-right:8px;'></i>Delete</button>
        <!-- <button class='dropdown-item' type='button' v-bind:data-image-upload-btn-id="task.id" onclick='showImageUpload(" + task.id + ")'> <i class='fa fa-file-image' style=' margin-right:8px;'></i>Upload Images</button> -->
        </div>
      </div>
      </div>
      <div class="text-left" style='width:100%; padding:10px;'  id='todo-title-wrap-" + task.id +"' >
       <div v-if="task.severity == 1 && task.completed == false">
         <span class='card-title'>{{ task.name }}</span><span class='badge  badge-success severity-badge'>Low</span>
       </div>
       <div v-else-if="task.severity == 2 && task.completed == false">
         <span class='card-title'>{{ task.name }}</span><span class='badge  badge-warning severity-badge'>Medium</span>
       </div>
       <div v-else-if="task.severity == 3 && task.completed == false">
         <span class='card-title'>{{ task.name }}</span><span class='badge  badge-danger severity-badge'>High</span>
       </div>
       <div v-else-if="task.completed == true">
         <span class='card-title disabled'>{{ task.name }}</span><span class='badge  badge-secondary severity-badge'>Closed</span>
       </div>
      </div>
      <div class='card-body text-left'>
        <p class='card-subtitle mb-2 text-muted'>{{ task.description }}</p><hr id='todo-hr-"+ task.id +"'/>
       <div v-if="!todosHidden">
        <div v-for="(todo, index) in todos" :key="index">
          <TodoList v-bind:todo="todo"></TodoList>
        </div>
      </div>
      </div>
      <div class='input-group'  style='padding:10px;'>
        <p class="red-text" v-if="feedback">
          {{ feedback }}
        </p>
        <input type='text' class='form-control' placeholder='Add to do here...' v-model="todoInput" aria-describedby='button-addon2' :disabled="task.completed">
        <div class='input-group-append'>
          <button class='btn btn-outline-secondary'  @click='addTodo(task._id)' :disabled="task.completed">
           <i class='fa fa-plus'></i>
          </button>
        </div>
      </div>
      <!-- <div class="assigned-to-text">Assigned To: {{ task.assignTo }}</div> -->
      <div v-bind:data-card-back="task.id" class='' style='display:none;'>
      </div>
      </div>
    </div>
  </div>
</template>

<script>

import TodoList from '@/components/TodoList.vue'

export default {
  name: 'TaskCard',
  components:{
    TodoList
  },
  props:
    ['task'],
  data(){
    return{
      todos: null,
      todoInput: null,
      feedback: null,
      completed: false,
      todosHidden: false,
      dropdownExpanded: false,
    }
  },
  computed:{
    //   todos(){
    //     return this.$store.getters.taskTodos.data;
    //   }
  },
  methods: {
    toggleTodoVisibility(){
      this.todosHidden = !this.todosHidden;
    },
    toggleDropdown(){
      this.dropdownExpanded = !this.dropdownExpanded;
    },
    addTodo(){
     var data = {name: this.todoInput, taskId: this.task._id, completed: false}
      this.$store.dispatch('postTodo', data).then(() => {
          //if success addTodo to dom
          this.todos.push(data);
          this.todoInput = null;
      })
    }
  },
  mounted(){
     this.$store.dispatch('fetchTodos', {taskId: this.task._id}).then((res) =>{
         this.todos = res.data;
     });
  }

}
</script>

<style lang="css" scoped>
.dropdown-menu{
  display:block;
  margin-top:-1px;
  border-radius: 0px 0px 5px 5px;
  box-shadow: 1px 5px 13px -5px #ccc;
}

.assigned-to-text{
  color: #ccc;
  padding: 0 5px 5px 5px;
  margin-right: 9px;
  font-style: italic; 
  font-size:12px; 
  position: relative; 
  text-align:right;
}
/* CARD BUTTON SHAPE */
.card-title.disabled{
  color: #ccc;
}
.btn-group>.btn-group:not(:last-child)>.btn, .btn-group>.btn:not(:last-child):not(.dropdown-toggle) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}
.btn-group>.btn-group:not(:first-child)>.btn, .btn-group>.btn:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
/********************/
.card{
  border:none;
}
*:focus{
  outline: none !important;
}
div.card-shadow{
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
    transition: transform 0.3s ease, box-shadow .3s linear;
}
div.card-shadow:hover{
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  transition: transform 0.3s ease, box-shadow .3s linear;
  transform: scale(1.015 , 1.015);
}
.task-wrap{
  margin-top: 15px;
}

.severity-badge{
  float:right;
  width:20%;
  padding:5px;
}

.completed-badge{
  float:right;
  width:35%;
  padding:6px;
}
.card-completed{
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1.5px solid #19B05D;
  border-radius: .25rem;
}
.card-title{
  width:70%;
  margin:10px;
  font-weight:700;
  font-size:16px;
  text-transform:uppercase;
}
.rotate180{
  -webkit-animation: rotateY 1s 1 linear;
 animation: rotateY 1s 1 linear;
}

@-webkit-keyframes rotateY {
  to { -webkit-transform: rotateY(180deg); }
}
@keyframes rotateY {
  to { transform: rotateY(180deg); }
}


</style>

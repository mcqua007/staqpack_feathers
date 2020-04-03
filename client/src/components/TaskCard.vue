<template lang="html">
  <div class="col-12 col-sm-6 col-lg-4 task-wrap animated" style=" margin-top:10px;" v-bind:data-card-id="response.id">
    <div v-if="response != null"> <!-- if no resposne display nothing - so no errors are cuased -->
      <div class='' data-expanded='false' v-bind:data-card-wrap-id="response.id" :responseOpen="!response.completed">
      <div class='col-xs-12 card card-shadow' v-bind:data-inner-card="response.id">
        <div class='btn-group' role='group' aria-label='Basic example'>
        <button type='button' v-bind:class="{'btn':true, 'btn-outline-primary':true}" v-bind:data-btn-audio-id="response.id" :disabled="!response.open"><i class='fa fa-calendar'></i></button>
        <button type='button' v-bind:class="{'btn':true, 'btn-outline-danger':true}" onclick='showImages(" + response.id +")' v-bind:data-btn-image-id="response.id" :disabled="!response.open"><i class="far fa-images"></i></button>
      <div class='btn-group'>
        <button class='btn btn-outline-secondary dropdown-toggle' type='button' id='btnGroupDrop1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' v-bind:data-btn-more-id="response.id"> more </button>
        <div class='dropdown-menu dropdown-menu-right' aria-labelledby='btnGroupDrop1' data-dropdown-task-id='" + response.id +"'>
        <button class='dropdown-item' type='button' v-bind:data-showfront-btn-id="response.id" onclick='showFront(" + response.id +")' style='display:none;'> <i class='fa fa-arrow-left' style='margin-right:5px;'></i>Go Back</button>
       
         <div v-if="response.completed === false">
          <button class='dropdown-item' type='button' v-bind:data-complete-btn-id="response.id" @click="completeTask(response.id)"> 
           <i class='fa fa-check' style='margin-right:5px;'></i>Completed
          </button>
         </div>
         <div v-else>
           <button class='dropdown-item' type='button' v-bind:data-complete-btn-id="response.id" @click="reopenTask(response.id)"> 
            <i class='fa fa-undo' style='margin-right:5px;'></i>Re-open
          </button>
         </div>  
        <button class='dropdown-item' type='button' v-bind:data-hide-todo-btn-id="response.id" data-visible='true'  @click='toggleTodoVisibility()'>          
         <div v-if="todosHidden">
          <i class='fa fa-eye' style='margin-right:5px;'></i>Show Todos
         </div>
         <div v-else>
           <i class='fa fa-eye-slash' style='margin-right:5px;'></i>Hide Todos
         </div>      
        </button>
        <button class='dropdown-item' type='button' v-bind:data-delete-btn-id="response.id" @click="deleteTask(response.id)"> <i class='fa fa-trash' style='margin-right:8px;'></i>Delete</button>
        <!-- <button class='dropdown-item' type='button' v-bind:data-image-upload-btn-id="response.id" onclick='showImageUpload(" + response.id + ")'> <i class='fa fa-file-image' style=' margin-right:8px;'></i>Upload Images</button> -->
        </div>
      </div>
      </div>
      <div class="text-left" style='width:100%; padding:10px;'  id='todo-title-wrap-" + response.id +"' >
       <div v-if="response.severity == 1 && response.completed == false">
         <span class='card-title'>{{ response.name }}</span><span class='badge  badge-success severity-badge'>Low</span>
       </div>
       <div v-else-if="response.severity == 2 && response.completed == false">
         <span class='card-title'>{{ response.name }}</span><span class='badge  badge-warning severity-badge'>Medium</span>
       </div>
       <div v-else-if="response.severity == 3 && response.completed == false">
         <span class='card-title'>{{ response.name }}</span><span class='badge  badge-danger severity-badge'>High</span>
       </div>
       <div v-else-if="response.completed == true">
         <span class='card-title disabled'>{{ response.name }}</span><span class='badge  badge-secondary severity-badge'>Closed</span>
       </div>
      </div>
      <div class='card-body text-left'>
        <p class='card-subtitle mb-2 text-muted'>{{ response.description }}</p><hr id='todo-hr-"+ response.id +"'/>
       <!-- <div v-if="!todosHidden" v-bind:data-todo-wrap="response.id">
        <div v-for="(todos, index) in todoData">
          <TodoList v-bind:todoData="todos" v-bind:taskOpen="response.open" v-bind:taskId="response.id" v-bind:key="index"></TodoList>
        </div>
      </div> -->
      </div>
      <div class='input-group'  style='padding:10px;'>
        <p class="red-text" v-if="feedback">
          {{ feedback }}
        </p>
        <input type='text' class='form-control' placeholder='Add to do here...' v-model="todoInput" v-bind:data-todo-input-id="response.id" aria-describedby='button-addon2' :disabled="response.completed">
        <div class='input-group-append'>
          <button class='btn btn-outline-secondary' type='button' v-bind:data-todo-button="response.id" @click='addTodo(response.id)' :disabled="response.completed">
           <i class='fa fa-plus'></i>
          </button>
        </div>
      </div>
      <!-- <div class="assigned-to-text">Assigned To: {{ response.assignTo }}</div> -->
      <div v-bind:data-card-back="response.id" class='' style='display:none;'>
      </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>

//import TodoList from '@/components/layouts/TodoList.vue'

export default {
  name: 'TaskCard',
  components:{
    //TodoList
  },
  props:
    ['response'],
  data(){
    return{
      todoInput: null,
      feedback: null,
      todoData: null,
      todoResponse: null,
      responseOpen: null,
      completed: false,
      todosHidden: false,
    }
  },
  methods: {
    toggleTodoVisibility(){
      this.todosHidden = !this.todosHidden;
    },
//     completeTask(id){
//        db.collection("tasks").doc(id).update({
//          open: false
//        }).then(function(){
//          console.log("Task - "+id+": Has been completed!");
//          this.completed = true;
//        });
//     },
//     deleteTask(id){
//        db.collection("tasks").doc(id).delete().then(function(){
//          console.log("Task - "+id+": Has been deleted!");
//          //notify here or do something else 
//        });
//     },
//     reopenTask(id){
//        db.collection("tasks").doc(id).update({
//          open: true
//        }).then(function(){
//          console.log("Task - "+id+": Has been completed!");
//          this.completed = false;
//        });
//     },
//     getTodosByTask(){
//      console.log("todo - taskId:"+ this.response.id);
//      var that = this; //have to use this to reference the same object
//      var stuff = [];
     
//      //getTodods from firebase
//      db.collection("todos").where("taskId", "==", this.response.id).orderBy("timestamp", "desc")
//      .onSnapshot(function(querySnapshot) {
//          querySnapshot.forEach(function(doc) {
//              // doc.data() is never undefined for query doc snapshots
//              var response = doc.data();

//             var newElement = {
//                   "id": doc.id,
//                   "todo": response.todo,
//                   "open": response.open,
//                   "timestamp": response.timestamp,
//                   "taskId": response.taskId,
//                   "userId": response.userId
//                 };

//                stuff = stuff.concat(newElement);

//                console.log("<STUFF:>  </STUFF:>", stuff);

//          });

//          that.todoData = stuff;

//      })
//    },
//     addTodo(id){
//       var that = this;
//       if(this.todoInput){
//         db.collection('todos').add({
//           todo: this.todoInput,
//           taskId: id,
//           open: true,
//           userId: this.$store.getters.getUser.uid,
//           timestamp: Date.now()
//         }).then(docRef =>{
//           console.log('Todo Id Created:', docRef.id);
//           //add todo id to task 
//          db.collection("teams")
//            .doc(that.team)
//            .update({
//              todos: firebase.firestore.FieldValue.arrayUnion(docRef.id)
//           })
//           .catch(err => {
//             console.log(err);
//             reject(err);
//           });
//         }).catch(err => {
//           console.log(err)
//         });
//         this.todoInput = null; //allow to reset
//         $('input[type="text"], textarea').val(''); //reset form input to an empty value
//         this.getTodosByTask();

//       }
//        else {
//           this.feedback = "You must fill out to do"
//         }
//     }

  },
  mounted(){
   //this.getTodosByTask();
  }

}
</script>

<style lang="css" scoped>
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
  margin-top: 10px;
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

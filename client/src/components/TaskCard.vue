<template lang="html">
  <div class="col-12 col-sm-6 col-lg-4 task-wrap">
    <div v-if="task != null">
      <div
        :class="{
          'col-xs-12': true,
          card: true,
          'card-shadow': true,
          'card-back-active': backActive,
        }"
      >
        <div class="btn-group" role="group">
          <button
            v-bind:class="{ btn: true, 'btn-outline-primary': true }"
            :disabled="task.completed"
          >
            <i class="la la-calendar"></i>
          </button>
          <button
            v-bind:class="{ btn: true, 'btn-outline-danger': true }"
            :disabled="task.completed"
          >
            <i class="la la-images"></i>
          </button>
          <div class="btn-group">
            <button
              class="btn btn-outline-secondary dropdown-btn"
              aria-haspopup="true"
              @click="toggleDropdown()"
            >
              <i
                :class="{
                  'dropdown-btn': true,
                  la: true,
                  'la-angle-down': !dropdownExpanded,
                  'la-angle-up': dropdownExpanded,
                }"
              ></i>
            </button>
            <div
              v-show="dropdownExpanded"
              :class="{
                'dropdown-menu': true,
                'dropdown-menu-right': true,
                active: dropdownExpanded == true,
              }"
            >
              <div v-show="!task.completed">
                <button class="dropdown-item" @click="toggleCompletedTask(task._id)">
                  <i class="la la-check"></i>Completed
                </button>
              </div>
              <div v-show="task.completed">
                <button class="dropdown-item" @click="toggleCompletedTask(task._id)">
                  <i class="la la-redo"></i>Re-open
                </button>
              </div>
              <div v-show="!backActive">
                <button class="dropdown-item" @click="toggleBack()">
                  <i class="la la-arrow-left"></i>Show Back
                </button>
              </div>
              <div v-show="backActive">
                <button class="dropdown-item" @click="toggleBack()">
                  Go Home
                </button>
              </div>
              <button class="dropdown-item" @click="toggleTodoVisibility()">
                <div v-show="todosHidden"><i class="la la-eye"></i>Show Todos</div>
                <div v-show="!todosHidden"><i class="la la-eye-slash"></i>Hide Todos</div>
              </button>
              <button
                class="dropdown-item"
                v-bind:data-delete-btn-id="task._id"
                @click="deleteTask(task._id, task.projectId)"
              >
                <i class="la la-trash"></i>Delete
              </button>
              <!-- <button class="dropdown-item" v-bind:data-image-upload-btn-id="task._id" 
              onclick='showImageUpload(" + task._id + ")'> <i class='la la-file-image' style=' 
              margin-right:8px;'></i>Upload Images</button> -->
            </div>
          </div>
        </div>
        <div :class="{ 'card-main-wrap': true, 'due-date-active': task.dueDate }">
          <div
            role="button"
            class="card-title-badge-wrap text-left"
            v-if="task.severity == 1 && task.completed == false"
            @click="toggleBadge(task._id)"
          >
            <span class="card-title">{{ task.name }}</span
            ><span class="badge  badge-success severity-badge">Low</span>
          </div>
          <div
            role="button"
            class="card-title-badge-wrap text-left"
            v-else-if="task.severity == 2 && task.completed == false"
            @click="toggleBadge(task._id)"
          >
            <span class="card-title">{{ task.name }}</span
            ><span class="badge  badge-warning severity-badge">Medium</span>
          </div>
          <div
            role="button"
            class="card-title-badge-wrap text-left"
            v-else-if="task.severity == 3 && task.completed == false"
            @click="toggleBadge(task._id)"
          >
            <span class="card-title">{{ task.name }}</span
            ><span class="badge  badge-danger severity-badge">High</span>
          </div>
          <div class="card-title-badge-wrap text-left" v-else-if="task.completed == true">
            <span class="card-title disabled">{{ task.name }}</span
            ><span class="badge  badge-secondary severity-badge">Closed</span>
          </div>
          <div class="card-body text-left">
            <p class="card-subtitle mb-2 text-muted">{{ task.description }}</p>
            <hr />
            <div v-show="!todosHidden">
              <div v-for="(todo, index) in todos" :key="index">
                <TodoList v-bind:todo="todo"></TodoList>
              </div>
            </div>
          </div>
          <div class="input-group todo-input-group">
            <p class="red-text" v-show="feedback">
              {{ feedback }}
            </p>
            <input
              type="text"
              class="form-control"
              placeholder="Add to do here..."
              v-model="todoInput"
              aria-describedby="button-addtodo"
              :disabled="task.completed"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                @click="addTodo(task._id, task.projectId)"
                :disabled="task.completed"
              >
                <i class="la la-plus"></i>
              </button>
            </div>
          </div>
          <div v-if="task.dueDate" class="due-date">Due: {{ dueDate }}</div>
        </div>
        <!-- <div class="assigned-to-text">Assigned To: {{ task.assignTo }}</div> -->
        <div v-bind:data-card-back="task._id" class="" style="display:none;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import TodoList from "@/components/TodoList.vue";
  //import { mapState } from "vuex";

  export default {
    name: "TaskCard",
    components: {
      TodoList,
    },
    props: ["task"],
    data() {
      return {
        todos: null,
        todoInput: null,
        feedback: null,
        completed: false,
        todosHidden: false,
        dropdownExpanded: false,
        backActive: false,
        timer: null,
      };
    },
    computed: {
      dueDate() {
        //const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        let date = new Date(this.task.dueDate);
        return date.toLocaleDateString();
      },
      mainClick() {
        return this.$store.getters.mainClick;
      },
      //mapState(['mainClick']);
    },
    methods: {
      //maybe can combine these two below into one function such as toggleCompleted
      toggleCompletedTask(taskId) {
        this.$store
          .dispatch("patchTask", { id: taskId, update: { completed: !this.task.completed } })
          .then(() => {
            //do something here once delete is complete
            this.$store.commit("UPDATE_TASK_COMPLETED", {
              taskId: taskId,
              newValue: !this.task.completed,
            });
            this.dropdownExpanded = false;
          });
      },
      toggleBadge(taskId) {
        clearTimeout(this.timer);
        var currentBadge = this.task.severity;
        if (currentBadge < 3) {
          this.task.severity++;
        } else {
          this.task.severity = 1;
        }
        this.timer = setTimeout(() => {
          this.$store
            .dispatch("patchTask", { id: taskId, update: { severity: this.task.severity } })
            .then(() => {
              this.$store.commit("UPDATE_TASK_BADGE", {
                taskId: taskId,
                newValue: this.task.severity,
              });
            });
        }, 2300);
      },
      deleteTask(taskId, projectId) {
        let data = {
          task: {
            id: taskId,
            query: { projectId: projectId },
          },
          todo: {
            id: null,
            query: { taskId: taskId },
          },
        };

        this.$store.dispatch("deleteTasks", data).then(() => {
          //do something here once delete is complete
        });
      },
      toggleBack() {
        this.backActive = !this.backActive;
      },
      toggleTodoVisibility() {
        this.todosHidden = !this.todosHidden;
      },
      toggleDropdown() {
        this.dropdownExpanded = !this.dropdownExpanded;
      },

      addTodo(taskId, projectId) {
        var data = {
          name: this.todoInput,
          taskId: taskId,
          projectId: projectId,
          completed: false,
        };
        this.$store.dispatch("createTodo", data).then((res) => {
          console.log("Todo creation res: ", res);
          //if success addTodo to dom
          this.todos.push(res);
          this.todoInput = null;
        });
      },
      getTodos() {
        this.$store.dispatch("fetchTodos", { taskId: this.task._id }).then((res) => {
          this.todos = res.data;
        });
      },
    },
    //added key to router-view in main and this seems to make sur ethe ocmponent reloads
    //if this eventually fails for some reason watch the route chang ebelow worked to fetch the todos
    // watch: {
    //   $route() {
    //     console.log("TaskCard Watcher -Fired");
    //     this.getTodos();
    //   },
    // },
    watch: {
      //this clicks out of the dropdown if someone clicks somehwere else
      mainClick(newEvent) {
        if (
          !newEvent.target.className.toString().includes("dropdown-btn") &&
          !newEvent.target.className.toString().includes("dropdown-item")
        ) {
          this.dropdownExpanded = false;
        }
      },
    },
    created() {
      console.log("taskCompled: ", this.task.completed);
      console.log("Created TaskCard -Fired: ", this.task._id);
      this.getTodos();
    },
  };
</script>

<style lang="css" scoped>
  .dropdown-menu {
    display: block;
    margin-top: -1px;
    border-radius: 0px 0px 5px 5px;
    box-shadow: 1px 5px 13px -5px #ccc;
  }
  .assigned-to-text {
    color: #ccc;
    padding: 0 5px 5px 5px;
    margin-right: 9px;
    font-style: italic;
    font-size: 12px;
    position: relative;
    text-align: right;
  }
  /* CARD BUTTON SHAPE */
  .card-title.disabled {
    color: #ccc;
  }
  .btn-group > .btn-group:not(:last-child) > .btn,
  .btn-group > .btn:not(:last-child):not(.dropdown-toggle) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .btn-group > .btn-group:not(:first-child) > .btn,
  .btn-group > .btn:not(:first-child) {
    border-top-right-radius: 5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  /********************/

  *:focus {
    outline: none !important;
  }
  div.card-shadow {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 1px 5px 0 rgba(0, 0, 0, 0.12);
    transition: transform 0.3s ease, box-shadow 0.3s linear;
  }
  div.card-shadow:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transform: scale(1.015, 1.015);
  }
  /* div.card.card-shadow{
    border: none;
    transition: transform .45s linear;
  }
  /* need to use differnet classes or selctors to not overide transform */
  /*
  div.card.card-shadow.card-back-active{
    transform: rotateY(180deg);
  } */
  .task-wrap {
    margin-top: 15px;
  }
  .todo-input-group {
    margin: 10px 0 0 0;
  }

  .severity-badge {
    margin-left: auto;
    width: 20%;
    padding: 5px;
    line-height: normal;
    color: #fff;
  }

  .completed-badge {
    float: right;
    width: 35%;
    padding: 6px;
  }
  .card-main-wrap {
    padding: 0.9em;
  }
  .card-main-wrap.due-date-active {
    padding-bottom: 0;
  }
  .due-date {
    margin: 0.5em 0 0.2em 0;
    float: right;
    font-size: 0.85em;
    color: #bcbcbc;
    font-style: italic;
  }
  .card-body {
    padding: 0;
  }
  .card-completed {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1.5px solid #19b05d;
    border-radius: 0.25rem;
  }
  /* .input-group {
    padding: 0;
  } */
  .card-title {
    width: 80%;
    margin: 0;
    font-weight: 700;
    font-size: 16px;
    text-transform: uppercase;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .card-title-badge-wrap {
    margin: 0 0 1em 0;
    display: inline-flex;
    width: 100%;
    align-items: flex-end;
  }
  .rotate180 {
    -webkit-animation: rotateY 1s 1 linear;
    animation: rotateY 1s 1 linear;
  }
  .dropdown-item i {
    margin-right: 5px;
  }
  @-webkit-keyframes rotateY {
    to {
      -webkit-transform: rotateY(180deg);
    }
  }
  @keyframes rotateY {
    to {
      transform: rotateY(180deg);
    }
  }
</style>

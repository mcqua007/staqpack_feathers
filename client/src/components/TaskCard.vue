<template lang="html">
  <div class="col-12 col-sm-6 col-lg-4 task-wrap" :data-id="task._id">
    <div
      :class="{
        'col-xs-12': true,
        card: true,
        'card-shadow': true,
        'card-back-active': backActive
      }"
    >
      <div class="btn-group" role="group">
        <div
          :class="{
            'big-btn-width': true,
            btn: true,
            'btn-outline-primary': true,
            'btn-input-container': true,
            disabled: task.completed
          }"
          :disabled="task.completed"
        >
          <flat-pickr
            class="date-picker-btn"
            v-model="newDueDatetime"
            @on-change="datePickerOpen"
            @on-close="datetimeChange"
            :config="dateConfig"
            :disabled="task.completed"
          ></flat-pickr>
          <i class="la la-calendar" v-show="dateIconShow"></i>
        </div>
        <button
          @click="toggleImages(task._id)"
          v-bind:class="{
            btn: true,
            'btn-outline-danger': true,
            'big-btn-width': true
          }"
          :disabled="task.completed"
        >
          <i
            :class="{
              la: true,
              'la-images': !imagesActive,
              'la-home': imagesActive
            }"
          ></i>
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
                'la-angle-up': dropdownExpanded
              }"
            ></i>
          </button>
          <div
            v-show="dropdownExpanded"
            :class="{
              'dropdown-menu': true,
              'dropdown-menu-right': true,
              active: dropdownExpanded == true
            }"
          >
            <div v-show="!task.completed">
              <button
                v-show="!imagesActive"
                class="dropdown-item"
                @click="toggleCompletedTask(task._id)"
              >
                <i class="la la-check"></i>Completed
              </button>
            </div>
            <div v-show="task.completed">
              <button
                class="dropdown-item"
                @click="toggleCompletedTask(task._id)"
              >
                <i class="la la-redo"></i>Re-open
              </button>
            </div>
            <button
              v-show="!imagesActive"
              class="dropdown-item"
              @click="toggleTodoVisibility()"
            >
              <div v-show="todosHidden">
                <i class="la la-eye"></i>Show Todos
              </div>
              <div v-show="!todosHidden">
                <i class="la la-eye-slash"></i>Hide Todos
              </div>
            </button>
            <button
              v-show="!imagesActive"
              class="dropdown-item"
              v-bind:data-delete-btn-id="task._id"
              @click="deleteTask(task._id, task.projectId)"
            >
              <i class="la la-trash"></i>Delete
            </button>
            <button
              v-show="!imagesActive"
              class="dropdown-item"
              @click="toggleImages(task._id)"
            >
              <i class="la la-file-image"></i>Images
            </button>
            <button
              v-show="backActive && imagesActive"
              class="dropdown-item"
              @click="toggleFileUpload()"
            >
              <i class="la la-upload"></i> Upload Image
            </button>
            <button
              v-show="backActive"
              class="dropdown-item"
              @click="toggleImages(task._id)"
            >
              <div><i class="la la-arrow-left"></i>Go Back</div>
            </button>
          </div>
        </div>
      </div>
      <div
        v-show="!backActive"
        :class="{
          'front-of-card': true,
          'card-main-wrap': true
        }"
      >
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
        <div
          class="card-title-badge-wrap text-left"
          v-else-if="task.completed == true"
        >
          <span class="card-title disabled">{{ task.name }}</span
          ><span class="badge  badge-secondary severity-badge">Closed</span>
        </div>
        <div class="card-body text-left">
          <p class="card-subtitle mb-2 text-muted" v-if="task.description">
            {{ task.description }}
          </p>
          <!-- Below is not reactive -->
          <div v-if="totalTaskTodos != 0">
            <i class="la la-list-alt"></i> Completed: {{ numCompletedTodos }}/{{
              totalTaskTodos
            }}
            ({{ todoPercentCompleted }}%)
          </div>
          <div v-else>
            No Todos yet.
          </div>
          <div v-show="!todosHidden">
            <hr />
            <div class="card-todo-wrap">
              <div v-for="(todo, index) in todos" :key="index">
                <TodoList
                  :todo="todo"
                  :taskCompleted="task.completed"
                ></TodoList>
              </div>
            </div>
          </div>
        </div>
        <form
          class="input-group todo-input-group"
          @submit.prevent="addTodo(task._id, task.projectId)"
        >
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
              type="submit"
              :disabled="task.completed"
            >
              <i class="la la-plus"></i>
            </button>
          </div>
        </form>
      </div>
      <!-- <div class="assigned-to-text">Assigned To: {{ task.assignTo }}</div> -->
      <div v-show="backActive" class="back-of-card card-main-wrap">
        <div v-show="imagesActive" class="back-of-card-images">
          <h5>Images</h5>
          <div class="new-images-grid" v-show="images">
            <img v-for="image in images" :src="image" :key="image" />
          </div>
          <div class="flex-row" v-show="uploadImageActive">
            <form action="" @submit.prevent>
              <input
                class="file-input"
                type="file"
                @change="onFileChange"
                ref="inputFile"
              />
              <button class="btn btn-secondary" @click="uploadImage()">
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodoList from "@/components/TodoList.vue";
//used for date picker component
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import axios from "axios";
//import { mapState } from "vuex";

export default {
  name: "TaskCard",
  components: {
    TodoList,
    flatPickr
  },
  props: ["task"],
  data() {
    return {
      id: this.task._id,
      todos: null,
      todoInput: null,
      feedback: null,
      completed: false,
      todosHidden: false,
      dropdownExpanded: false,
      backActive: false,
      timer: null,
      imagesActive: false,
      uploadImageActive: false,
      imageUrl: null,
      newDueDatetime: null,
      totalTaskTodos: 0,
      todoPercentCompleted: 0,
      numCompletedTodos: 0,
      images: this.task.images ? this.task.images : [],
      //newImages: [],
      dateIconShow: this.task.dueDate ? false : true,
      dateConfig: {
        wrap: true,
        disableMobile: true,
        enableTime: false,
        dateFormat: "Z",
        altInput: true,
        altFormat: "n/j/y",
        defaultDate: this.task.dueDate ? this.task.dueDate : null,
        defaultHour: this.task.dueDate
          ? new Date(this.task.dueDate).getHours()
          : null,
        defaultMinute: this.task.dueDate
          ? new Date(this.task.dueDate).getMinutes()
          : 0
      }
    };
  },
  computed: {
    dueDate() {
      let date = new Date(this.task.dueDate);
      return date.toLocaleDateString();
    },
    mainClick() {
      return this.$store.getters.mainClick;
    }
  },
  methods: {
    toggleFileUpload() {
      this.uploadImageActive = !this.uploadImageActive;
    },
    datePickerOpen() {
      this.dateIconShow = false;
    },
    datetimeChange() {
      console.log("Called dataTimeChange: ", this.newDueDatetime);
      if (this.newDueDatetime) {
        console.log(this.newDueDatetime);
        this.$store
          .dispatch("patchTask", {
            id: this.id,
            update: { dueDate: this.newDueDatetime }
          })
          .then(() => {
            //update tasks in store
            this.$store.commit("UPDATE_TASK", {
              id: this.id,
              field: "dueDate",
              newValue: this.newDueDatetime
            });
            this.dropdownExpanded = false;
          });
      }
    },
    onFileChange(e) {
      var reader = new FileReader();
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    },
    uploadImage() {
      console.log(this.images);
      axios({
        method: "post",
        url: "http://localhost:3030/uploads",
        data: { uri: this.imageUrl }
      })
        .then(res => {
          console.log("res", res);
          this.imageUrl = null;

          var newImageUrl = res.config.url + "/" + res.data.id;
          var tempImages = this.images;
          tempImages.push(newImageUrl);
          if (res.status === 201) {
            this.$store
              .dispatch("patchTask", {
                id: this.id,
                update: {
                  images: tempImages
                }
              })
              .then(() => {
                //do something here once delete is complete
                this.$store.commit("UPDATE_TASK", {
                  id: this.id,
                  field: "images",
                  newValue: tempImages
                });

                //this.newImages.push(newImageUrl); //update current ui for the file upload section
                this.$refs.inputFile.value = null; //reset input file
              });
          }
        })
        .catch(e => {
          alert(e);
          this.$refs.inputFile.value = null; //reset input file
        });
    },
    //maybe can combine these two below into one function such as toggleCompleted
    toggleCompletedTask(taskId) {
      this.$store
        .dispatch("patchTask", {
          id: taskId,
          update: { completed: !this.task.completed }
        })
        .then(() => {
          //do something here once delete is complete
          this.$store.commit("UPDATE_TASK", {
            id: taskId,
            field: "completed",
            newValue: !this.task.completed
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
          .dispatch("patchTask", {
            id: taskId,
            update: { severity: this.task.severity }
          })
          .then(() => {
            this.$store.commit("UPDATE_TASK", {
              id: taskId,
              field: "severity",
              newValue: this.task.severity
            });
          });
      }, 2300);
    },
    deleteTask(taskId, projectId) {
      let data = {
        task: {
          id: taskId,
          query: { projectId: projectId }
        },
        todo: {
          id: null,
          query: { taskId: taskId }
        }
      };

      this.$store.dispatch("deleteTasks", data).then(() => {
        //do something here once delete is complete
      });
    },
    toggleBack(id) {
      //if back of card is going to be in view get height of front so they are the same
      //TODO: can do this with refs instead
      if (!this.backActive) {
        let backCard = document.querySelector(
          '.task-wrap[data-id="' + id + '"] .back-of-card'
        );
        let frontCardHeight = document.querySelector(
          '.task-wrap[data-id="' + id + '"] .front-of-card'
        ).offsetHeight;
        backCard.style = "min-height: " + frontCardHeight + "px;";
      }
      this.backActive = !this.backActive;
      this.dropdownExpanded = false;
    },
    toggleImages(id) {
      this.toggleBack(id);
      this.imagesActive = !this.imagesActive;
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
        completed: false
      };
      this.$store.dispatch("createTodo", data).then(res => {
        //if success addTodo to dom
        this.todos.push(res);
        this.todoInput = null;
      });
    },
    getTodos() {
      this.$store
        .dispatch("fetchTodos", { taskId: this.task._id })
        .then(res => {
          this.todos = res.data;
          this.totalTaskTodos = res.total;
          //TODO: below is not reactive
          if (res.total > 0) {
            this.numCompletedTodos = res.data.filter(
              todo => todo.completed === true
            ).length;
          }
          //calculate percent complete
          if (this.numCompletedTodos > 0 && res.total > 0) {
            this.todoPercentCompleted = (
              (this.numCompletedTodos / this.totalTaskTodos) *
              100
            ).toFixed(0);
          }

          console.log(this.todoPercentCompleted);
          //End not reactive
        });
    }
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
    }
  },
  created() {
    this.getTodos();
  }
};
</script>
<!-- Date Picker Can't be Scoped Since it's another componenet -->
<style>
.date-picker-btn.form-control[readonly] {
  border-top-left-radius: 0.25em;
  border: none;
  cursor: pointer;
}
.date-picker-btn.form-control[readonly],
.date-picker-btn::placeholder {
  background-color: transparent;
  color: #007bff;
  border: none;
  width: 100%;
  text-align: center;
  position: relative;
}
.active.date-picker-btn::placeholder,
.date-picker-btn.form-control[readonly]:hover {
  color: #fff;
}
.btn-outline-primary.disabled .date-picker-btn.form-control[readonly]:hover {
  color: #007bff;
  cursor: default;
}
.big-btn-width {
  width: 50%;
}
.flatpickr-day.selected,
.flatpickr-day.startRange,
.flatpickr-day.endRange,
.flatpickr-day.selected.inRange,
.flatpickr-day.startRange.inRange,
.flatpickr-day.endRange.inRange,
.flatpickr-day.selected:focus,
.flatpickr-day.startRange:focus,
.flatpickr-day.endRange:focus,
.flatpickr-day.selected:hover,
.flatpickr-day.startRange:hover,
.flatpickr-day.endRange:hover,
.flatpickr-day.selected.prevMonthDay,
.flatpickr-day.startRange.prevMonthDay,
.flatpickr-day.endRange.prevMonthDay,
.flatpickr-day.selected.nextMonthDay,
.flatpickr-day.startRange.nextMonthDay,
.flatpickr-day.endRange.nextMonthDay {
  background: #007bff;
  -webkit-box-shadow: none;
  box-shadow: none;
  color: #fff;
  border-color: #007bff;
}
.btn-input-container {
  position: relative;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-input-container i {
  position: absolute;
  pointer-events: none;
}
</style>
<!-- Scoped to this component -->
<style lang="css" scoped>
.new-images-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 6px;
  margin: 10px 0;
}
.new-images-grid > img {
  width: 100%;
}
.file-input {
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
}
.btn-outline-danger[disabled="disabled"] {
  cursor: default;
}
.card-todo-wrap {
  /* max-height: 275px; */
  overflow-y: auto;
}

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
  box-shadow: 0 2px 6px -2px rgba(0, 0, 0, 0.14);
  transition: transform 0.3s ease, box-shadow 0.3s linear;
}
div.card-shadow:hover {
  box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.2);
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
.back-of-card {
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
.flex-row {
  display: inline-flex;
  width: 100%;
}
input.tester {
  position: relative;
}
input.tester::-webkit-input-placeholder {
  font-family: "Line Awesome Free";
  content: "\f133";
  color: #000;
  top: 0;
  left: 0;
  z-index: 2;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
}
</style>

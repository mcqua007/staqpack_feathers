<template lang="html">
  <div
    v-if="todo != null"
    class="todo"
    :style="todoStyle"
    :disabled="taskCompleted"
  >
    <div class="form-check" v-show="!editInputState">
      <input
        type="checkbox"
        :id="todo._id"
        v-model="checkedState"
        @change="toggleCheckBox(todo._id)"
        class="form-check-input"
        :disabled="taskCompleted"
      />
      <label
        class="form-check-label todo-name"
        :for="todo._id"
        v-bind:data-id="todo._id"
        >{{ todo.name }}</label
      >
      <i
        class="la la-edit edit-todo"
        role="button"
        @click="toggleEditTodo(todo.name)"
      ></i>
    </div>
    <div class="edit-todo-row" v-show="editInputState">
      <input
        class="form-check-label"
        type="text"
        v-model="editInput"
        v-on:keyup="checkChange(todo.name)"
      />
      <i
        :class="{
          la: true,
          'la-check': todoChange === true,
          'la-times': !todoChange
        }"
        role="button"
        @click="saveTodoEdit(todo._id, todo.name)"
      ></i>
      <i
        class="la la-trash edit-todo-delete"
        role="button"
        @click="deleteTodo(todo._id)"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  props: ["todo", "taskCompleted"],
  data() {
    return {
      checkedState: this.todo.completed,
      editInputState: false,
      editInput: null,
      todoChange: false,
      todoStyle: null
    };
  },
  methods: {
    toggleEditTodo(todo) {
      this.editInputState = !this.editInputState;

      if (todo) {
        this.editInput = todo;
      }
    },
    checkChange(todo) {
      if (this.editInput != todo) {
        this.todoChange = true;
      } else {
        this.todoChange = false;
      }
    },
    toggleCheckBox(id) {
      this.$store
        .dispatch("patchTodo", {
          id: id,
          update: { completed: this.checkedState }
        })
        .then();
    },
    saveTodoEdit(id, original_todo) {
      if (this.editInput != original_todo) {
        //save todo in DB
        this.$store
          .dispatch("patchTodo", { id: id, update: { name: this.editInput } })
          .then(() => {
            document.querySelector(
              '.todo-name[data-id="' + id + '"]'
            ).innerHTML = this.editInput; //edit current todo
            this.todoChange = false;
            this.editInputState = false; //close editable state
          });
      } else {
        //toggle todo edit state
        this.toggleEditTodo();
      }
    },
    deleteTodo(id) {
      let data = { todo: { id: id, query: "" } };
      this.$store
        .dispatch("deleteTodos", data)
        .then(() => {
          this.todoStyle = { display: "none" };
        })
        .catch(e => {
          console.log("Delete Todo Error: ", e);
        });
    }
  },
  mounted() {}
};
</script>

<style lang="css" scoped>
.todo[disabled="disabled"] .edit-todo {
  display: none;
}
.form-check {
  display: inline-flex;
  width: 100%;
  padding-left: 1.3em;
}
.form-check i {
  opacity: 0;
  transition: opacity 0.225s linear;
}
.form-check:hover i {
  opacity: 1;
}
i.la-edit {
  margin-left: auto;
  color: #6c757d;
}
i.la-times {
  color: #6c757d;
}
i.la-check {
  color: #28a745;
}
i.edit-todo-delete {
  color: #dc3545;
  margin-left: 5px;
}
.edit-todo-row {
  display: inline-flex;
  align-items: center;
  width: 100%;
}
.edit-todo-row input[type="text"] {
  border: none;
  border-bottom: 1px solid #ced4da;
  width: 100%;
  margin-bottom: 7.5px;
}
</style>

<template>
  <div class="task-form">
    <!-- componenet wrapper -->
    <transition name="fade">
      <div v-if="$store.getters.taskFormState == true" class="jumbotron" style=" margin-top:10px;">
        <i class="la la-times close" role="button" @click="hideTaskForm()"></i>
        <h3 style="margin-bottom: 25px;">Add New Task</h3>
        <form data-project-id @submit.prevent>
          <div class="row">
            <div class="form-group col-md-4">
              <label for="issueDescInput">Task</label>
              <input type="text" class="form-control" placeholder="Name of new task..." v-model="name" />
            </div>
            <div class="form-group col-md-4">
              <label for="issueSeverityInput">Severity</label>
              <select class="form-control" v-model="severity">
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </select>
            </div>
            <!-- Temporary measure to select proejct name a task will belong too -->
            <div class="form-group col-md-4">
              <label for="issueProjectId">Project</label>
              <select class="form-control" v-model="projectId">
                <option value="null" disabled>[Choose Project]</option>
                <option v-for="project in projects" :value="project._id" :key="project.name">{{ project.name }}</option>
              </select>
            </div>
            <!-- use v-if project is a team project then allow to assign -->
            <!-- HAve a list of people from the team to assign to -->
            <!-- <div class="form-group col-md-4">
           <label for="issueAssignedToInput">Assigned To</label>
           <input type="text" class="form-control" placeholder="Assign To..." v-model="assignTo">
            </div>-->
          </div>
          <div class="row flex-end">
            <div class="form-group col-12 col-md-6">
              <label for="description">Description (optional)</label>
              <input type="text" class="form-control" placeholder="Describe the issue..." v-model="description" />
            </div>
            <div class="form-group col-12 col-md-3">
              <label for="dueDate">Due Date (optional)</label>
              <input type="date" class="form-control" v-model="taskDueDate" />
            </div>
            <div class="form-group col-12 col-md-3">
              <button class="btn btn-primary btn-block" @click="submitTaskForm()">
                Create Task
              </button>
            </div>
          </div>
          <transition name="fade">
            <p
              v-show="feedback"
              :class="{
                alert: true,
                'text-center': true,
                'alert-danger': alertType === 'danger',
                'alert-success': alertType === 'success',
                'alert-warning': alertType === 'warning',
                'alert-primary': alertType === 'primary',
              }"
            >
              {{ feedback }}
            </p>
          </transition>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'TaskForm',
    props: ['currentProjectId'],
    data() {
      return {
        name: null,
        alertType: null,
        severity: '1',
        assignTo: null,
        description: null,
        feedback: null,
        projectId: this.$route.name == 'Project' ? this.$route.params.id : null,
        projects: null,
        taskDueDate: null,
      };
    },
    methods: {
      alertFeedback(message, type, time) {
        let timeOut = time != undefined ? time : 2500;
        this.feedback = message;
        this.alertType = type;
        var that = this;
        setTimeout(function() {
          that.feedback = null;
          this.alertType = null;
        }, timeOut);
      },
      hideTaskForm() {
        this.$store.commit('toggleTaskForm', this.$store.getters.taskFormState);
      },
      submitTaskForm() {
        if (this.name && this.projectId) {
          let formData = {
            name: this.name,
            severity: this.severity,
            //assignTo: this.assignTo,
            description: this.description,
            projectId: this.projectId,
            dueDate: this.taskDueDate,
          };
          console.log('formData: ', formData);
          this.$store
            .dispatch('createTask', formData)
            .then(() => {
              //RESETING FORM VALUES
              this.name = null;
              this.severity = '1';
              //this.assignTo = null;
              this.description = null;
              this.projectId = null;
              this.taskDueDate = null;
              //Emit event to main down to project d Task that where submitted
              this.$emit('taskFormInput');
              this.alertFeedback('You new task has been created.', 'primary');
            })
            .catch((e) => {
              this.alertFeedback('Error: ' + e, 'danger'); //alert error feedback
            });
        } else {
          this.alertFeedback('You must have a Task Name and a choose a Project!', 'danger');
        }
      },
    },
    computed: mapState(['loading']),
    watch: {
      loading(newValue) {
        if (newValue === false) {
          this.projects = this.$store.getters.projects;
        }
      },
      $route() {
        if (this.$route.name == 'Project') {
          this.projectId = this.$route.params.id; //refering to project id
        }
      },
    },
    created() {
      //make taskForm select option the same as the project it is in
      if (this.$route.name == 'Project') {
        this.projectId = this.$route.params.id; //refering to project id
      }

      console.log(this.$route);
    },
    mounted() {},
  };
</script>

<style lang="css" scoped>
  .red-text {
    color: red;
  }

  /* USED IN MAIN OTHER COMPONENS - MAIN *NOT DRY */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .form-group {
    text-align: left;
  }
  .jumbotron {
    padding: 30px 20px;
  }
  .close {
    float: right;
    font-size: 30px;
    color: #ccc;
    position: relative;
  }
  .flex-end {
    align-items: flex-end;
  }
  /*================================*/
</style>

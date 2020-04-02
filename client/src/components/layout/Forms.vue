    <!-- All The Form Componenets -->
<template>
 <div class="forms">
      <ProjectForm></ProjectForm>
      <!-- <TeamForm></TeamForm>-->
      <TaskForm v-bind:projectId="projectId" v-on:taskFormInput="emitUp()"></TaskForm>
 </div>
</template>

<script>
import TaskForm from '@/components/forms/TaskForm.vue'
import ProjectForm from '@/components/forms/ProjectForm.vue'
// import TeamForm from '@/components/forms/TeamForm.vue'

export default {
  name: 'Forms',
  components: {
    TaskForm,
    ProjectForm,
    //TeamForm
  },
  props: ['projectId'],
  data () {
    return {
      msg: 'Test msg'
    }
  },
  methods: {
    emitUp(){
      console.log('Forms Task Emit');
      this.$emit('taskFormInput');
    }
  },
  mounted(){
    console.log("Loaded Forms")
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.margin-tb-25{
    margin: 25px 0;
}
</style>

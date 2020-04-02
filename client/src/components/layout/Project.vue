<template>
  <div class="project"><!-- componenet wrapper -->
    <div class="row">
        <!-- <template v-for="responses in responseData">
          <TaskContainer v-bind:response="responses"></TaskContainer>
        </template> -->
    </div>
  </div> <!-- end componenet wrapper -->
</template>

<script>
//import TaskContainer from '@/components/layouts/TaskContainer.vue'

export default {
  name: 'Project',
  components: {
    //TaskContainer
  },
  props: ['responseData'],
  data(){
    return {
      title: null,
      severity: 'Low',
      assignTo: null,
      description: null,
      feedback: null,
    }
  },
  methods: {
  },
  mounted(){

  }
}
</script>

<style lang="css" scoped>
.red-text{
  color: red;
}

/* USED IN MAIN OTHER COMPONENS - MAIN *NOT DRY */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/*================================*/
</style>

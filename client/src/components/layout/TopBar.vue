<template lang="html">
  <div class="top-bar" :style="{ backgroundColor: this.$store.getters.themeColor }">
    <div class="menu-icon" v-show="$store.getters.sideBarState == true">
      <i class="la la-times menu-icon-style" @click="toggleSideBar()"></i>
    </div>
    <div class="menu-icon" v-show="$store.getters.sideBarState == false">
      <i @click="toggleSideBar()" class="la la-bars menu-icon-style"></i>
    </div>
    <div class="logo-font top-bar-logo">Staqpack</div>
    <div class="btn-group btn-group-style">
      <button
        :class="{
          'dropdown-tbtn': true,
          'add-btn-menu': true,
          'c-white': true,
          'dropdown-expanded': dropdownExpanded,
        }"
        @click="toggleDropdown()"
        id="btnGroupDrop1"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i
          :class="{
            'dropdown-btn': true,
            la: true,
            'la-plus': true,
            active: dropdownExpanded == true,
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
        aria-labelledby="btnGroupDrop1"
        data-dropdown-task-id=""
      >
        <button class="dropdown-item" type="button" @click="toggleTaskForm()">
          <i class="la la-plus margin-r-5"></i> New Task
        </button>
        <button class="dropdown-item" type="button" @click="toggleProjectForm()">
          <i class="la la-plus margin-r-5"></i> New Project
        </button>
        <!-- <button class="dropdown-item"   type="button" data-complete-btn-id=""  @click="toggleTeamForm()"> Team</button> -->
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "TopBar",
    data() {
      return {
        dropdownExpanded: false,
      };
    },
    methods: {
      toggleDropdown() {
        this.dropdownExpanded = !this.dropdownExpanded;
      },
      toggleTaskForm() {
        // Hide any other forms open by turning there state to false
        //sets all forms stats to false
        this.$store.commit("hideAllForms");
        // Toggle Task From state
        this.$store.commit("toggleTaskForm", this.$store.getters.taskFormState);
        // if form showing/true
        if (this.$store.getters.taskFormState == true) {
          // if in view scroll up to top of page -later maybe make a modal
          this.toggleDropdown(); //close drop down menu
          window.scrollTo(0, 0);
        }
      },
      toggleProjectForm() {
        // Hide any other forms open by turning there state to false
        //sets all forms stats to false
        this.$store.commit("hideAllForms");

        // Toggle Project Form state
        this.$store.commit("toggleProjectForm", this.$store.getters.projectFormState);
        // if form showing/true
        if (this.$store.getters.projectFormState == true) {
          // if in view scroll up to top of page -later maybe make a modal
          this.toggleDropdown(); //close drop down menu
          window.scrollTo(0, 0);
        }
      },
      toggleSideBar() {
        // Toggle SideBar state
        this.$store.commit("toggleSideBar", this.$store.getters.sideBarState);
      },
    },
    computed: mapState(["mainClick"]),
    watch: {
      mainClick(newEvent) {
        // console.log("Watch topbar mainClick: ", newEvent.target.className);
        if (
          !newEvent.target.className.toString().includes("dropdown-btn") &&
          !newEvent.target.className.toString().includes("dropdown-item")
        ) {
          this.dropdownExpanded = false;
        }
      },
    },
    mounted() {},
  };
</script>

<style lang="css" scoped>
  .add-btn-menu {
    border-color: transparent;
    background-color: transparent;
    padding: 0;
    text-align: right;
    display: inline-flex;
    align-items: center;
    font-weight: 500;
  }
  .dropdown-menu {
    display: block;
    margin-top: 12px;
    border-top: none;
    border-radius: 0px 0px 5px 5px;
    box-shadow: 1px 5px 13px -5px #ccc;
  }

  .add-btn-menu i {
    font-size: 21px;
    margin-right: 5px;
    transition: transform 0.35s linear;
  }
  .add-btn-menu i.active {
    transform: rotate(135deg);
  }
  .top-bar-logo {
    color: #fff;
    font-size: 25px;
    margin-left: auto;
  }
  .menu-icon-style {
    color: #fff;
    font-size: 22px;
  }
  .top-bar {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    /* background-color: #007bff; */
    background: #343434;
    position: sticky;
    top: 0px;
    width: 100%;
    padding: 5px 7.5px;
    z-index: 10;
  }

  .btn-group-style {
    margin-left: auto;
  }
  .c-white {
    color: #fff;
  }
  .menu-icon {
    display: flex;
    cursor: pointer;
  }
  .margin-r-5 {
    margin-right: 5px;
  }
</style>

<template>
  <div class="text-left">
      <h3>Settings</h3>
      <hr/>
      <div class="form-group">
          <label>Theme Color</label>
          <div class="flex-row">
            <div :class="{'color-preview':true, 'no-color':(this.themeColorInput == false)}" :style="{backgroundColor: this.themeColorInput}">
                <i class="fa fa-eye-slash" v-if="!this.themeColorInput"></i>
            </div>
            <input class="form-control" type="text" v-model="themeColorInput" />
            <button class="btn btn-secondary margin-l-10" @click="changeThemeColor()">save</button>
          </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Settings',
  data(){
    return {
      themeColorInput: this.$store.getters.themeColor,
    }
  },
  methods: {
      changeThemeColor(){
         this.$store.commit('setThemeColor', this.themeColorInput);
      }
  },
  mounted(){

  }
}
</script>

<style lang="css" scoped>
.flex-row{
    display:inline-flex;
    width:100%;
}
.margin-l-10{
    margin-left:10px;
}
.color-preview{
    width: 40px;
    height: auto;
    border-radius: 5px;
    margin-right: 10px
}
.no-color{
    border: 1px solid #ced4da;
    padding: 5px;
    text-align: center;
}
.no-color i{
    color: #ced4da;
    font-size:20px;
    vertical-align: middle;
}
</style>

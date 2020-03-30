import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false


// Authenticate first before loading the app
//so user object is availbe, for reloads/refreshes of page

store.dispatch('authenticate')
  .catch(() => {})
  // Render the app
  .then(() => {
    // eslint-disable-next-line no-new
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  })



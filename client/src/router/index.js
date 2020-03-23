import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '@/components/Main'
import SignUp from '@/components/auth/SignUp'
import Login from '@/components/auth/Login'
import store from '../store'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/app*',
    redirect: '/login'
  },
  {
      path: '/app',
      name: 'Main',
      component: Main,
      meta: {
        requiresAuth: true
      }
   },
   {
     path: '/signup',
     name: 'SignUp',
     component: SignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

  const currentUser = store.getters.getUser; //firebase.auth().currentUser;
  console.log("current user in router: ", currentUser);
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth && !currentUser){
    next('login');
  }
  else if (!requiresAuth && currentUser){
    next('main');
  }
  else{
    next();
  }
})

export default router;

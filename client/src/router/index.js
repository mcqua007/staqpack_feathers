import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Main from '@/components/Main'
import Project from '@/components/layout/Project'
import AllTasks from '@/components/layout/AllTasks'
import Settings from '@/components/settings/Settings'
import SignUp from '@/components/auth/SignUp'
import Login from '@/components/auth/Login'
import store from '../store'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/app',
    name: 'Main',
    component: Main,
    children: [{
        name: 'Project',
        path: '/app/project/:id',
        component: Project,
      },
      {
        name: 'Settings',
        path: '/app/user/settings/',
        component: Settings,
      },
      {
        name: 'AllTasks',
        path: '/app/tasks/',
        component: AllTasks,
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = store.state.user
  // console.log("router - current user", currentUser);
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) {
    console.log("in next login");
    next('login')
  } else {
    console.log("in next");
    next()
  }
})

export default router;
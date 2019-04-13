import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import login from '../components/login.vue'
import index from '../components/index.vue'

let routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/index',
    component: index
  }
]

let router = new VueRouter({
  routes
})
export default router


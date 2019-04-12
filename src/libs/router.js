import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import login from '../components/login.vue'

let routes = [
  {
    path: '/login',
    component: login
  }]

let router = new VueRouter({
  routes
})
export default router


import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import login from '../components/login.vue'
import index from '../components/index.vue'
import users from '../components/users.vue'
let routes = [
  {
    path: '/login',
    component: login
  },
  {
    path: '/',
    component: index,
    children:[{
      path:'users',
      component: users,
    }
    ]
  }
]

let router = new VueRouter({
  routes
})

// 导航守卫,路由跳转时比vue的钩子函数还要早执行,这样就可以在
router.beforeEach((to, from, next) => {
  if(to.path=="/login"){
    next()
  }else{
    if(window.sessionStorage.getItem('token')){
      next();
    }else{
      Vue.prototype.$message.warning('哥们,请先登录')
      next('/login')
    }
  } 
})
export default router


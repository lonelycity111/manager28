import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入路由
import router from './libs/router'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

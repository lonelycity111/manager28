import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import myhttp from './libs/myhttp'
Vue.use(myhttp)

// 导入路由
import router from './libs/router'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

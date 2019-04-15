// 导入axios
import axios from 'axios'
// 导入vue
import Vue from 'vue'
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/"
// 设置请求拦截器
axios.interceptors.request.use(function (config) {
  if (config.url.indexOf('/login') == -1) {
    // 不是登录接口
    config.headers.Authorization = window.sessionStorage.getItem('token')
  }
  return config
}, function (error) {
  return Promise.reject(error);
});
// 设置响应拦截器
axios.interceptors.response.use(function (response) {
  Vue.prototype.$message(response.data.meta.msg)
  return response;
}, function (error) {

  return Promise.reject(error);
});

export default {
  install(Vue) {
    Vue.prototype.$http = axios
  }
}
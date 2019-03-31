import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
Vue.config.productionTip = false
const http = axios.create({
  baseURL: window.location.origin,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
})

// 增加请求拦截器
http.interceptors.request.use((config) => {
  // 预处理请求的信息
  return config
}, (error) => {
  // 预处理请求有异常error时抛出错误
  return Promise.reject(error)
})
// 增加请求拦截器
http.interceptors.response.use((res) => {
  // 预处理相应的数据
  if (res.data.status === 2) {
    window.location.href = 'http://localhost:8080/login'
  }
  return res
}, (error) => {
  // 错误返回 状态码验证
  return Promise.reject(error)
})
Vue.prototype.$http = http
Vue.prototype.$http.all = axios.all
Vue.prototype.$http.spread = axios.spread
Vue.prototype.qs = qs
// Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

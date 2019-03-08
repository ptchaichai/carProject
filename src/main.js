import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'
Vue.config.productionTip = false
const http = axios.create({
  baseURL: window.location.origin,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
})
http.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})
http.interceptors.response.use((res) => {
  if (res.data.status === 2) {
    window.location.href = '/index.php?r=login/Ulogin'
  }
  return res
}, (error) => {
  return Promise.reject(error)
})
Vue.prototype.$http = http
Vue.prototype.$http.all = axios.all
Vue.prototype.$http.spread = axios.spread
Vue.prototype.qs = qs
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

import Vue from 'vue'
import Router from 'vue-router'
import personal from '../page/personalMange/personal'
import subordinate from '../page/personalMange/subordinate'
import updatePwd from '../page/advance/updatePwd'
import saleInformation from '../page/saleInformation'
import carInformation from '../page/carInformation'
import callClient from '../page/clientManage/callClient'
import comeClient from '../page/clientManage/comeClient'
import buyClient from '../page/clientManage/buyClient'
import announcement from '../page/announcement'
import home from '../page/home'
import perfect from '../page/advance/perfect'
import Login from '../page/login'
import Index from '../page/index'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', redirect: '/login'},
    {
      path: '/login',
      component: Login
    },
    {
      path: '/manage',
      component: Index,
      children: [
        {path: '', redirect: '/manage/home'},
        {
          path: 'advance/perfect',
          name: 'perfect',
          component: perfect
        },
        {
          path: 'home',
          name: 'home',
          component: home
        },

        {
          path: 'personalMange/personal',
          name: 'personal',
          component:personal
        },
        {
          path: 'personalMange/subordinate',
          name: 'subordinate',
          component: subordinate
        },
        {
          path: 'advance/updatePwd',
          name: 'updatePwd',
          component: updatePwd
        },
        {
          path: 'saleInformation',
          name: 'saleInformation',
          component: saleInformation
        },
        {
          path: 'carInformation',
          name: 'carInformation',
          component: carInformation
        },
        {
          path: 'clietManage/callClient',
          name: 'callClient',
          component: callClient
        },
        {
          path: 'clietManage/comeClient',
          name: 'comeClient',
          component:comeClient
        },
        {
          path: 'clietManage/buyClient',
          name: 'buyClient',
          component: buyClient
        },
        {
          path: 'announcement',
          name: 'announcement',
          component: announcement
        },

      ]
    },

  ]
})

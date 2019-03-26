import Vue from 'vue'
import Router from 'vue-router'
import personal from '../page/personal'
import subordinate from '../page/subordinate'
import updatePwd from '../page/updatePwd'
import saleInformation from '../page/saleInformation'
import carInformation from '../page/carInformation'
import callClient from '../page/callClient'
import comeClient from '../page/comeClient'
import buyClient from '../page/buyClient'
import announcement from '../page/announcement'
import home from '../page/home'
import perfect from '../page/perfect'
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
          path: 'perfect',
          name: 'perfect',
          component: perfect
        },
        {
          path: 'home',
          name: 'home',
          component: home
        },

        {
          path: 'personal',
          name: 'personal',
          component:personal
        },
        {
          path: 'subordinate',
          name: 'subordinate',
          component: subordinate
        },
        {
          path: 'updatePwd',
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
          path: 'callClient',
          name: 'callClient',
          component: callClient
        },
        {
          path: 'comeClient',
          name: 'comeClient',
          component:comeClient
        },
        {
          path: 'buyClient',
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

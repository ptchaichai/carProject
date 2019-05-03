import Vue from 'vue'
import Router from 'vue-router'
import personal from '../page/personalManage/personal'
import subordinate from '../page/personalManage/subordinate'
import subordinateManager from '../page/personalManage/subordinateManager'
import updatePwd from '../page/advance/updatePwd'
import saleInformation from '../page/saleInformation'
import carInformation from '../page/carManage/carInformation'
import carRank from '../page/carManage/carRank'
import callClient from '../page/clientManage/callClient'
import comeClient from '../page/clientManage/comeClient'
import buyClient from '../page/clientManage/buyClient'
import announcement from '../page/announcement'
import home from '../page/home'
import perfect from '../page/advance/perfect'
import Login from '../page/login'
import manage from '../page/manage'
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
      component: manage,
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
          path: 'personalManage/personal',
          name: 'personal',
          component:personal
        },
        {
          path: 'personalManage/subordinate',
          name: 'subordinate',
          component: subordinate
        },
        {
          path: 'personalManage/subordinateManager',
          name: 'subordinateManager',
          component: subordinateManager
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
          path: 'carManage/carInformation',
          name: 'carInformation',
          component: carInformation
        },
        {
          path: 'carManage/carRank',
          name: 'carRank',
          component: carRank
        },
        {
          path: 'clientManage/callClient',
          name: 'callClient',
          component: callClient
        },
        {
          path: 'clientManage/comeClient',
          name: 'comeClient',
          component:comeClient
        },
        {
          path: 'clientManage/buyClient',
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

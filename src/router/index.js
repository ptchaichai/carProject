import Vue from 'vue'
import Router from 'vue-router'
// import login from '@/page/login'
// import login from '@/components/login'
import information from '@/page/information'
import subordinate from '@/page/subordinate'
import updatePwd from '@/page/updatePwd'
import saleInformation from '@/page/saleInformation'
import carInformation from '@/page/carInformation'
import callClient from '@/page/callClient'
import comeClient from '@/page/comeClient'
import buyClient from '@/page/buyClient'
import announcement from '@/page/announcement'
import home from '@/page/home'
import test from '@/page/test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },

    {
      path: '/information',
      name: 'information',
      component:information
    },
    {
      path: '/subordinate',
      name: 'subordinate',
      component: subordinate
    },
    {
      path: '/updatePwd',
      name: 'updatePwd',
      component: updatePwd
    },
    {
      path: '/saleInformation',
      name: 'saleInformation',
      component: saleInformation
    },
    {
      path: '/carInformation',
      name: 'carInformation',
      component: carInformation
    },
    {
      path: '/callClient',
      name: 'callClient',
      component: callClient
    },
    {
      path: '/comeClient',
      name: 'comeClient',
      component:comeClient
    },
    {
      path: '/buyClient',
      name: 'buyClient',
      component: buyClient
    },
    {
      path: '/announcement',
      name: 'announcement',
      component: announcement
    },
  ]
})

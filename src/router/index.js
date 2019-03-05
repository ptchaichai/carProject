import Vue from 'vue'
import Router from 'vue-router'
import Smanager from '@/components/Smanager'
import updatePwd from '@/components/updatePwd'
import sidebar from '@/components/sManagerSidebar'
import content from '@/components/content'
import sManagerIndex from '@/components/sManagerIndex'

// Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Smanager',
      component: Smanager
    },
    {
      path: '/',
      name: 'updatePwd',
      component: updatePwd
    },
    {
      path: '/',
      name: 'sManagerSidebar',
      component: sidebar
    },
    {
      path: '/',
      name: 'content',
      component: content
    },
    {
      path: '/',
      name: 'sManagerIndex',
      component: sManagerIndex
    }
  ]
})

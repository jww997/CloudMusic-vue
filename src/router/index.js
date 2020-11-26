import Vue from 'vue'
import Router from 'vue-router'
import Discover from '@/pages/discover'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Discover',
      component: Discover
    }
  ]
})
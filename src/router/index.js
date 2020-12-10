import Vue from 'vue'
import Router from 'vue-router'
import Discover from '@/pages/discover'
import Playlist from '@/pages/playlist'
import Player from '@/pages/player'

import store from '@/store';

Vue.use(Router)

let router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Discover',
      component: Discover,
    },
    {
      path: '/playlist',
      name: 'Playlist',
      component: Playlist,
    },
    {
      path: '/player',
      name: 'Player',
      component: Player,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// 全局导航守卫
router.beforeEach((to, from, next) => {
  // 对组件B进行动态缓存
  const that = this;
  // if (to.name == 'Discover') {
  store.commit('keepAlivesDel', to.name);
  next();
  // }
})

export default router;

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Discover',
//       component: resolve => require(['@/pages/discover'], resolve),
//     },
//     {
//       path: '/playlist',
//       name: 'Playlist',
//       component: resolve => require(['@/pages/playlist'], resolve),
//     }
//   ]
// })

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Discover',
//       component: () => import('@/pages/discover'),
//     },
//     {
//       path: '/playlist',
//       name: 'Playlist',
//       component: () => import('@/pages/playlist'),
//     }
//   ]
// })
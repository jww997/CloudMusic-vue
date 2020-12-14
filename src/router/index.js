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
      // meta: {
      //   keepAlive: false, //此组件不需要被缓存
      //   isBack: false, //用于判断上一个页面是哪个
      // }
    },
    {
      path: '/player',
      name: 'Player',
      component: Player,
      // meta: {
      //   keepAlive: false, //此组件不需要被缓存
      //   isBack: false, //用于判断上一个页面是哪个
      // }
    },
  ],
  // scrollBehavior(to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // },

  // beforeRouteEnter(to, from, next) {
  //   if (from.name == "confirm") {
  //     to.meta.isBack = true;
  //   }
  //   next();
  // },
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
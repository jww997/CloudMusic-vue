import Vue from 'vue'
import Router from 'vue-router'
import Discover from '@/pages/discover'
import Playlist from '@/pages/playlist'

Vue.use(Router)



export default new Router({
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
    }
  ]
})

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
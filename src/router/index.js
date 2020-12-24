import Vue from 'vue'
import Router from 'vue-router'
// import Discover from '@/pages/discover'
// import Playlist from '@/pages/playlist'
// import Player from '@/pages/player'
// import Mine from '@/pages/mine'

Vue.use(Router)


const _component = (name) => {
  return (resolve) => {
    import(`@/pages/${name}`)
      .then((module) => {
        resolve(module)
      })
  }
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/discover',
    },
    {
      path: '/discover',
      name: 'discover',
      component: _component("discover"),
      meta: {
        isKeepAlive: true,
      },
      children: [
        {
          path: 'dailyspecial',
          name: 'dailyspecial',
          component: _component("dailyspecial"),
        },
        {
          path: 'playlist/:id',
          name: 'playlist',
          component: _component("playlist"),
          meta: {
            isKeepAlive: true,
          }
        },
      ]
    },
    {
      path: '/mine',
      name: 'mine',
      component: _component("mine"),
    },
    {
      path: '/player',
      name: 'player',
      component: _component("player"),
    },




    // {
    //   path: '/playlist/:id',
    //   name: 'playlist',
    //   component: resolve => require(['@/pages/playlist'], resolve),
    //   meta: {
    //     isKeepAlive: false,
    //   },
    // },






  ]
});

export default router;

// export default new Router({
//   mode: 'hash',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/',
//       name: 'Discover',
//       component: Discover,
//     },



//     {
//       path: '/playlist',
//       name: 'Playlist',
//       component: Playlist,
//       // meta: {
//       //   keepAlive: false, //此组件不需要被缓存
//       //   isBack: false, //用于判断上一个页面是哪个
//       // }
//     },





//     {
//       path: '/player',
//       name: 'Player',
//       component: Player,
//       meta: {
//         keepAlive: false, //此组件不需要被缓存
//         // isBack: false, //用于判断上一个页面是哪个
//       }
//     },
//     {
//       path: '/mine',
//       name: 'Mine',
//       component: Mine
//     },
//   ],

// })



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


// 全局导航守卫
// router.beforeEach((to, from, next) => {
//   // 对组件B进行动态缓存
//   const that = this;
//   // if (to.name == 'Discover') {
//   store.commit('keepAlivesDel', to.name);
//   next();
//   // }
// })

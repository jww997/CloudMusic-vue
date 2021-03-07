/**
 * @Author: Gavin
 * @Begin: 2020-12-30 10:49:29
 * @Update: 2020-12-30 10:49:29
 * @Update log: 路由
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
// 获取原型对象上的push函数
const originalPush = Router.prototype.push;
// 修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/discover',
    },
    {
      path: '/discover',
      name: 'discover',
      component: _component('discover'),
      children: [



        {
          path: 'player',
          name: 'player',
          component: _component('player'),
        },
        {
          path: 'mv',
          name: 'mv',
          component: _component('mv'),
        },



        {
          path: 'playlist/:id',
          name: 'playlist',
          component: _component('playlist'),
          // children: [
          //   {
          //     path: 'player',
          //     name: 'playlist/player',
          //     component: _component('player'),
          //   },
          //   {
          //     path: 'comment',
          //     name: 'playlist/comment',
          //     component: _component('comment'),
          //   },
          //   {
          //     path: 'mv',
          //     name: 'playlist/mv',
          //     component: _component('mv'),
          //   }
          // ]
        },

        {
          path: 'dailyspecial',
          name: 'dailyspecial',
          component: _component('dailyspecial'),
        },
        {
          path: 'square',
          name: 'square',
          component: _component('square'),
          children: [{
            path: 'playlist/:id',
            name: 'square/playlist',
            component: _component('playlist'),
          }]
        },
        {
          path: 'toplist',
          name: 'toplist',
          component: _component('toplist'),
          children: [{
            path: 'playlist/:id',
            name: 'toplist/playlist',
            component: _component('playlist'),
          }]
        },



        {
          path: 'comment',
          name: 'comment',
          component: _component('comment'),
        },

        {
          path: 'search',
          name: 'search',
          component: _component('search'),
        },
        {
          path: 'login',
          name: 'login',
          component: _component('login'),
        },
        {
          path: 'oneself',
          name: 'oneself',
          component: _component('oneself'),
        }
      ]
    },
















    // {
    //   path: '/mine',
    //   name: 'mine',
    //   component: _component("mine"),
    // },



  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});


function _component(name) {
  return resolve => require([`@/pages/${name}`], resolve);
}







































// function _component(name) {
//   return (resolve) => {
//     import(name)
//       .then((module) => {
//         resolve(module)
//       })
//   }
// }





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

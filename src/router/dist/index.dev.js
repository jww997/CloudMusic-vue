"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import Discover from '@/pages/discover'
// import Playlist from '@/pages/playlist'
// import Player from '@/pages/player'
// import Mine from '@/pages/mine'
_vue["default"].use(_vueRouter["default"]);

var router = new _vueRouter["default"]({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'discover',
    component: function component(resolve) {
      return require(['@/pages/discover'], resolve);
    }
  }, {
    path: '/playlist/:id',
    name: 'playlist',
    meta: {
      isKeepAlive: false
    },
    component: function component(resolve) {
      return require(['@/pages/playlist'], resolve);
    }
  }, {
    path: '/player',
    name: 'player',
    component: function component(resolve) {
      return require(['@/pages/player'], resolve);
    }
  }, {
    path: '/mine',
    name: 'mine',
    component: function component(resolve) {
      return require(['@/pages/mine'], resolve);
    }
  }, {
    path: '*',
    redirect: '/'
  }]
});
var _default = router; // export default new Router({
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

exports["default"] = _default;
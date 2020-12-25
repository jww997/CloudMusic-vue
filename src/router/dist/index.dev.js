"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import Discover from '@/pages/discover'
// import Playlist from '@/pages/playlist'
// import Player from '@/pages/player'
// import Mine from '@/pages/mine'
_vue["default"].use(_vueRouter["default"]);

var _component = function _component(name) {
  return function (resolve) {
    Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/pages/".concat(name)));
    }).then(function (module) {
      resolve(module);
    });
  };
};

var router = new _vueRouter["default"]({
  mode: 'history',
  routes: [{
    path: '*',
    redirect: '/discover'
  }, {
    path: '/discover',
    name: 'discover',
    component: _component("discover"),
    meta: {
      isKeepAlive: true
    },
    children: [{
      path: 'dailyspecial',
      name: 'dailyspecial',
      component: _component("dailyspecial")
    }, {
      path: 'square',
      name: 'square',
      component: _component("square")
    }, {
      path: 'playlist/:id',
      name: 'playlist',
      component: _component("playlist"),
      meta: {
        isKeepAlive: true
      }
    }]
  }, {
    path: '/mine',
    name: 'mine',
    component: _component("mine")
  }, {
    path: '/player',
    name: 'player',
    component: _component("player")
  } // {
  //   path: '/playlist/:id',
  //   name: 'playlist',
  //   component: resolve => require(['@/pages/playlist'], resolve),
  //   meta: {
  //     isKeepAlive: false,
  //   },
  // },
  ]
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
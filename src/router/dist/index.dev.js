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

_vue["default"].use(_vueRouter["default"]); // // 获取原型对象上的push函数
// const originalPush = Router.prototype.push;
// // 修改原型对象中的push方法
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }


var _default = new _vueRouter["default"]({
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
      component: _component("dailyspecial"),
      meta: {
        isKeepAlive: true
      }
    }, {
      path: 'square',
      name: 'square',
      component: _component("square"),
      meta: {
        isKeepAlive: true
      },
      children: [{
        path: 'playlist/:id',
        name: 'square/playlist',
        component: _component("playlist"),
        meta: {
          isKeepAlive: true
        }
      }]
    }, {
      path: 'toplist',
      name: 'toplist',
      component: _component("toplist"),
      meta: {
        isKeepAlive: true
      },
      children: [{
        path: 'playlist/:id',
        name: 'toplist/playlist',
        component: _component("playlist"),
        meta: {
          isKeepAlive: true
        }
      }]
    }, {
      path: 'playlist/:id',
      name: 'playlist',
      component: _component("playlist"),
      meta: {
        isKeepAlive: true
      }
    }]
  }, {
    path: '/comment/:id',
    name: 'comment',
    component: _component("comment"),
    meta: {
      isKeepAlive: false
    }
  }, {
    path: '/mine',
    name: 'mine',
    component: _component("mine")
  }],
  scrollBehavior: function scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    };
  }
});

exports["default"] = _default;

function _component(name) {
  return function (resolve) {
    Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/pages/".concat(name)));
    }).then(function (module) {
      resolve(module);
    });
  };
} // export default new Router({
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
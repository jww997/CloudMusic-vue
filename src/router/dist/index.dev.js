"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _discover = _interopRequireDefault(require("@/pages/discover"));

var _playlist = _interopRequireDefault(require("@/pages/playlist"));

var _player = _interopRequireDefault(require("@/pages/player"));

var _store = _interopRequireDefault(require("@/store"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var router = new _vueRouter["default"]({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'Discover',
    component: _discover["default"]
  }, {
    path: '/playlist',
    name: 'Playlist',
    component: _playlist["default"] // meta: {
    //   keepAlive: false, //此组件不需要被缓存
    //   isBack: false, //用于判断上一个页面是哪个
    // }

  }, {
    path: '/player',
    name: 'Player',
    component: _player["default"] // meta: {
    //   keepAlive: false, //此组件不需要被缓存
    //   isBack: false, //用于判断上一个页面是哪个
    // }

  }] // scrollBehavior(to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // },
  // beforeRouteEnter(to, from, next) {
  //   if (from.name == "confirm") {
  //     to.meta.isBack = true;
  //   }
  //   next();
  // },

}); // 全局导航守卫

router.beforeEach(function (to, from, next) {
  // 对组件B进行动态缓存
  var that = _this; // if (to.name == 'Discover') {

  _store["default"].commit('keepAlivesDel', to.name);

  next(); // }
});
var _default = router; // export default new Router({
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

exports["default"] = _default;
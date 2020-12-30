"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App"));

var _store = _interopRequireDefault(require("./store"));

var _router = _interopRequireDefault(require("./router"));

require("css/reset.css");

require("css/border.css");

require("css/iconfont.css");

require("js/thirdparty.js");

require("js/filter.js");

require("js/skip.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 第三方整合
// 格式化操作
// 跳转操作

/* eslint-disable no-new */
new _vue["default"]({
  el: '#app',
  store: _store["default"],
  router: _router["default"],
  components: {
    App: _App["default"]
  },
  template: '<App/>'
});
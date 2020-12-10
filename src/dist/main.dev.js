"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App"));

var _router = _interopRequireDefault(require("./router"));

require("styles/reset.css");

require("styles/border.css");

require("styles/iconfont.css");

require("@/assets/js/vant.js");

require("@/assets/js/axios.js");

var _store = _interopRequireDefault(require("@/store"));

var _api = _interopRequireDefault(require("@/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// Vue.prototype.$store = store
_vue["default"].prototype.$api = _api["default"];
_vue["default"].config.productionTip = false;
/* eslint-disable no-new */

new _vue["default"]({
  el: '#app',
  router: _router["default"],
  components: {
    App: _App["default"]
  },
  template: '<App/>',
  store: _store["default"]
});
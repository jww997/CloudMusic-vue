"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _axios = _interopRequireDefault(require("axios"));

var _vueAxios = _interopRequireDefault(require("vue-axios"));

var _api = _interopRequireDefault(require("@/api"));

require("amfe-flexible/index.js");

var _vant = require("vant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @Author: Gavin
 * @Begin: 2020-12-30 10:49:29
 * @Update: 2020-12-30 10:49:29
 * @Update log: 第三方整合
 */
// rem 动态适配
_vue["default"].use(_vant.Swipe);

_vue["default"].use(_vant.SwipeItem);

_vue["default"].use(_vant.Tabbar);

_vue["default"].use(_vant.TabbarItem);

_vue["default"].use(_vant.Progress);

_vue["default"].use(_vant.NavBar);

_vue["default"].use(_vant.PullRefresh);

_vue["default"].use(_vant.Slider);

_vue["default"].use(_vant.Skeleton);

_vue["default"].use(_vant.Popup);

_vue["default"].use(_vant.Icon);

_vue["default"].use(_vant.Image);

_vue["default"].use(_vant.Loading);

_vue["default"].use(_vant.ImagePreview);

_vue["default"].use(_vant.Dialog);

_vue["default"].use(_vant.Notify);

_vue["default"].use(_vant.Toast);

_vue["default"].use(_vant.Lazyload);

_vue["default"].use(_vueAxios["default"], _axios["default"]);

_vue["default"].prototype.$api = _api["default"];
_vue["default"].prototype.$vant = new Object(); // 防止报错

_vue["default"].prototype.$vant.ImagePreview = _vant.ImagePreview;
_vue["default"].prototype.$vant.Dialog = _vant.Dialog;
_vue["default"].prototype.$vant.Notify = _vant.Notify;
_vue["default"].prototype.$vant.Toast = _vant.Toast;
_vue["default"].prototype.$vant.Lazyload = _vant.Lazyload; // Vue.config.devtools = true // 开发调试工具

_vue["default"].config.productionTip = false; // 阻止启动生产消息
// import infiniteScroll from 'vue-infinite-scroll'
// Vue.use(infiniteScroll)
// Vue.config.productionTip = false
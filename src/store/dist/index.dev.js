"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _mutations = _interopRequireDefault(require("@/store/mutations.js"));

var _actions = _interopRequireDefault(require("@/store/actions.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var store = new _vuex["default"].Store({
  state: {
    keepAlives: ['Discover', 'Player'] // 保存缓存的列表

  },
  mutations: _mutations["default"],
  actions: _actions["default"]
});
var _default = store;
exports["default"] = _default;
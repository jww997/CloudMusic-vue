"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _state = _interopRequireDefault(require("./state.js"));

var _getters = _interopRequireDefault(require("./getters.js"));

var _mutations = _interopRequireDefault(require("./mutations.js"));

var _actions = _interopRequireDefault(require("./actions.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @Author: Gavin
 * @Begin: 2020-12-30 10:49:29
 * @Update: 2020-12-30 10:49:29
 * @Update log: 状态管理
 */
_vue["default"].use(_vuex["default"]);

var store = new _vuex["default"].Store({
  state: _state["default"],
  getters: _getters["default"],
  mutations: _mutations["default"],
  actions: _actions["default"]
});
var _default = store;
exports["default"] = _default;
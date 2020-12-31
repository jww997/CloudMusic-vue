"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mutationTypes = _interopRequireDefault(require("./mutation-types.js"));

var _types$SET_PLAY_STATE;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_types$SET_PLAY_STATE = {}, _defineProperty(_types$SET_PLAY_STATE, _mutationTypes["default"].SET_PLAY_STATE, function (state, val) {
  state.playState = val;
}), _defineProperty(_types$SET_PLAY_STATE, _mutationTypes["default"].SET_PLAY_URL, function (state, val) {
  state.playUrl = val;
}), _defineProperty(_types$SET_PLAY_STATE, _mutationTypes["default"].SET_PLAY_INDEX, function (state, val) {
  state.playIndex = val;
}), _defineProperty(_types$SET_PLAY_STATE, _mutationTypes["default"].SET_PLAY_LIST, function (state, val) {
  state.playlist = val;
}), _defineProperty(_types$SET_PLAY_STATE, _mutationTypes["default"].SET_CURRENTTIME, function (state, val) {
  state.currentTime = val;
}), _defineProperty(_types$SET_PLAY_STATE, _mutationTypes["default"].SET_DURATION, function (state, val) {
  state.duration = val;
}), _types$SET_PLAY_STATE);

exports["default"] = _default;
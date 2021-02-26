"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _util = require("../assets/js/util.js");

var _default = {
  getMusic: function getMusic() {},
  // togglePlayer: function (index) {
  //   const that = this;
  //   that.setPlayerShow(true);
  //   if (typeof index == "number") {
  //     let list = that.obj.tracks;
  //     let current = list[index];
  //     that.setPlayId(current.id);
  //     that.setPlayIndex(index);
  //     that.setPlayList(list);
  //     that.setCurrentSong(current);
  //   }
  // },
  login: function login(_ref) {
    var commit = _ref.commit,
        state = _ref.state;
    var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var that = this;
    var cookie = val.cookie;
    (0, _util.setCookie)("cookie", cookie);
    commit("SET_LOGIN", val);
  },
  logout: function logout(_ref2) {
    var commit = _ref2.commit,
        state = _ref2.state;
    var that = this;
    var login = state.login;
    login.cookie = "";
    (0, _util.delCookie)("cookie");
    commit("SET_LOGIN", login);
  }
};
exports["default"] = _default;
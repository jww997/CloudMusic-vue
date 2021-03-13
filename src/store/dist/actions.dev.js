"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _util = require("@/assets/js/util.js");

var _default = {
  amendStateObjValue: function amendStateObjValue(_ref) {
    var state = _ref.state,
        commit = _ref.commit;
    var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var that = this;
    var key = val.key,
        value = val.value,
        name = val.name; // if (!key || !value) return false;

    if (!name) name = "music"; // console.log(`name = ${name}, key = ${key}, value = ${value}`);

    var obj = state[name];
    obj[key] = value;

    switch (name) {
      case "music":
        commit("SET_MUSIC", obj);
        break;

      case "mv":
        commit("SET_MV", obj);
        break;
    }

    ;
  },
  getMusic: function getMusic(_ref2, id) {
    var state = _ref2.state,
        commit = _ref2.commit,
        actions = _ref2.actions;
    var that = this;
    console.log("id = ".concat(id));
    var music = state.music; // if (music.id == id) return false;

    var api = that._vm.$api;

    try {
      api.getSongUrl({
        id: id
      }).then(function (res) {
        var url = res.data.data[0].url;

        if (!url) {
          that._vm.$vant.Toast("没有版权 / VIP专享");

          return false;
        } else {
          // that.amendStateObjValue({ key: "id", value: id });
          // that.amendStateObjValue({ key: "url", value: url });
          // that.amendStateObjValue({ key: "isPlaying", value: true });
          music.id = id;
          music.url = url;
          music.isPlaying = true;
          console.log("\u6E90 => ".concat(url));
          commit("SET_MUSIC", music);
        } // if (!music.current) {


        api.getSongDetail({
          ids: id
        }).then(function (res) {
          var songs = res.data.songs;
          music.current = songs[0];
          music.currentList = songs;
          commit("SET_MUSIC", music);
        })["catch"](function (err) {// music.current = {};
          // commit("SET_MUSIC", music);
        }); // };
      });
    } catch (error) {
      that.amendStateObjValue({
        key: "current",
        value: {}
      });
    }
  },
  login: function login(_ref3) {
    var state = _ref3.state,
        commit = _ref3.commit;
    var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var cookie = val.cookie;
    (0, _util.setCookie)("cookie", cookie);
    commit("SET_LOGIN", val);
  },
  logout: function logout(_ref4) {
    var state = _ref4.state,
        commit = _ref4.commit;
    (0, _util.delCookie)("cookie");
    (0, _util.delLocalStorage)("profile");
    commit("SET_LOGIN", {});
  }
};
exports["default"] = _default;
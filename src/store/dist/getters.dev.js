"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lyricParser = _interopRequireDefault(require("lyric-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { formatTime, formatLyric } from "@/assets/js/filter.js";
// 歌词解析
var _default = {
  // currentTime: function (state) {
  //     return formatTime(state.audio.example.currentTime);
  // },
  // duration: function (state) {
  //     console.log(state.audio.example.duration);
  //     return formatTime(state.audio.example.duration);
  // },
  lyric: function lyric(state, _lyric) {
    console.log(state);
    console.log(_lyric);
    if (!_lyric) return; // if (!lyric) lyric = state.lyric;

    return new _lyricParser["default"](_lyric, function (_ref) {
      var lineNum = _ref.lineNum,
          txt = _ref.txt;
      console.log("lineNum = ".concat(lineNum, ", txt = ").concat(txt));
      state.audio.lyric.curLine = lineNum; // 歌词实时下标
    });
  }
};
exports["default"] = _default;
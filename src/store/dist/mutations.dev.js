"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lyricParser = _interopRequireDefault(require("lyric-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 歌词解析
var _default = {
  play: function play(state) {
    console.log('播放');
    state.audio.isPlaying = true;
    state.audio.example.play();
    state.audio.lyric.play();
  },
  pause: function pause(state) {
    console.log('暂停');
    state.audio.isPlaying = false;
    state.audio.example.pause();
    state.audio.lyric.stop();
  },
  stop: function stop(state) {
    console.log('停止');
    state.isPlaying = false;
    state.audio.example.stop();
    state.audio.lyric.stop();
  },
  timeupdate: function timeupdate(state, callback) {
    // 状态更新
    console.log('状态更新');
    callback && (state.audio.example.ontimeupdate = callback);
  },
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
  },
  keepAlivesPush: function keepAlivesPush(state, component) {
    // 对指定组件进行动态更改缓存（缓存）--组件调用该方法时，判断该组件是否存在于该缓存数组，无则添加
    var keepAlives = state.keepAlives;
    !keepAlives.includes(component) && keepAlives.push(component);
  },
  keepAlivesDel: function keepAlivesDel(state, component) {
    // 对指定组件进行动态更改缓存（不缓存）--组件调用该方法时，从缓存数组中删除对应的组件元素
    var keepAlives = state.keepAlives;
    var index = keepAlives.indexOf(component);
    index > -1 && keepAlives.splice(index, 1);
  }
};
exports["default"] = _default;
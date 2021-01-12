"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mode = [{
  icon: "&#xe600;",
  text: "列表循环"
}, {
  icon: "&#xe66e;",
  text: "随机播放"
}, {
  icon: "&#xe60b;",
  text: "单曲循环"
}];
var _default = {
  currentSong: {},
  // 当前歌曲信息
  currentTime: "",
  // 当前时间
  duration: "",
  // 总时间
  playId: -1,
  // 播放标识号
  playIndex: -1,
  // 播放下标
  playlist: [],
  // 播放列表
  playlistShow: false,
  // 播放列表显示
  playUrl: "",
  // 播放地址
  playState: false,
  // 播放状态
  playSequence: 0,
  // 播放顺序
  playMode: _mode // 播放模式

};
exports["default"] = _default;
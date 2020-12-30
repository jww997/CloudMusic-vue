"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  audio: {
    example: new Audio(),
    // 实例
    isPlaying: false,
    current: {},
    // 当前播放的音乐信息
    lyric: {} // 歌词

  },
  isPlaying: false,
  // 播放状态
  playOrder: [],
  // 播放顺序
  lyric: {},
  // 歌词
  playUrl: "",
  playIndex: 0,
  // 播放下标
  playlist: [] // 播放列表

};
exports["default"] = _default;
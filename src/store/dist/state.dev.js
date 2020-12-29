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
  playlist: [] // 播放列表

};
exports["default"] = _default;
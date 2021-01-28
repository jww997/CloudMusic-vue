"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var mode = [{
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
  playId: -1,
  // 播放标识号
  playerShow: false,
  // 播放页显示隐藏
  playState: false,
  // 播放状态
  playDrag: false,
  // 播放拖拽(歌词，进度条)
  currentTime: "",
  // 当前时间
  duration: "",
  // 总时间
  currentSong: {},
  // 当前歌曲信息
  playIndex: -1,
  // 播放下标
  playlist: [],
  // 播放列表
  playUrl: "",
  // 播放地址
  playSequence: 0,
  // 播放模式下标
  playMode: mode,
  // 播放模式所有
  playVolume: 60,
  // 播放音量
  playlistToast: false,
  // 播放列表显示隐藏
  player: {
    id: -1,
    // 标识
    isShow: false,
    // 显示
    isPlaying: false,
    // 状态
    isDraging: false,
    // 拖拽
    currentTime: "",
    // 当前时间
    duration: "" // 总时间

  },
  mv: {
    id: -1,
    // 标识
    isShow: false,
    // 显示
    isPlaying: false,
    // 状态
    isDraging: false,
    // 拖拽
    currentTime: "",
    // 当前时间
    duration: "" // 总时间

  }
};
exports["default"] = _default;
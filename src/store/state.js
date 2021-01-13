const mode = [{
  icon: "&#xe600;",
  text: "列表循环",
}, {
  icon: "&#xe66e;",
  text: "随机播放",
}, {
  icon: "&#xe60b;",
  text: "单曲循环",
}];

export default {

  currentSong: {},        // 当前歌曲信息
  currentTime: "",        // 当前时间
  duration: "",           // 总时间

  playId: -1,             // 播放标识号
  playIndex: -1,          // 播放下标

  playlist: [],           // 播放列表
  playUrl: "",            // 播放地址

  playState: false,       // 播放状态
  playDrag: false,        // 播放拖拽(歌词，进度条)
  playlistToast: false,   // 播放列表显示隐藏

  // playlistShow: false,    // 播放列表显示隐藏

  playSequence: 0,        // 播放模式下标
  playMode: mode,         // 播放模式所有

}
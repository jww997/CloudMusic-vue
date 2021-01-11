export default {

  currentSong: {}, // 当前歌曲信息
  currentTime: "", // 当前时间
  duration: "", // 总时间

  playIndex: -1, // 播放下标
  playlist: [], // 播放列表
  playUrl: "", // 播放地址
  playState: false, // 播放状态
  playSequence: 0, // 播放顺序(0列表循环1随机播放2单曲循环)
  playMode: [{ // 播放模式
    icon: "&#xe600;",
    text: "列表循环",
  }, {
    icon: "&#xe66e;",
    text: "随机播放",
  }, {
    icon: "&#xe60b;",
    text: "单曲循环",
  }],

}
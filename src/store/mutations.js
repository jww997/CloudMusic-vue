import types from "./mutation-types.js"
export default {

  [types.SET_PLAY_STATE](state, val) {
    state.playState = val;
  },
  [types.SET_PLAY_URL](state, val) {
    state.playUrl = val;
  },
  [types.SET_PLAY_INDEX](state, val) {
    state.playIndex = val;
  },
  [types.SET_PLAY_LIST](state, val) {
    state.playlist = val;
  },


  [types.SET_CURRENTSONG](state, val) {
    state.currentSong = val;
  },
  [types.SET_CURRENTTIME](state, val) {
    state.currentTime = val;
  },
  [types.SET_DURATION](state, val) {
    state.duration = val;
  },






















  // timeupdate: function (state, callback) { // 播放时间改变
  //   callback && (state.audio.example.ontimeupdate = callback);
  // },
  // ended: function (state, callback) { // 播放结束
  //   callback && (state.audio.example.ended = callback);
  // },















  // play: function (state) {
  //   console.log('播放');
  //   state.audio.isPlaying = true;
  //   state.audio.example.play();
  // },







  // pause: function (state) {
  //   console.log('暂停');
  //   state.audio.isPlaying = false;
  //   state.audio.example.pause();
  //   // state.audio.lyric.stop();
  // },
  // stop: function (state) {
  //   console.log('停止');
  //   state.isPlaying = false;
  //   state.audio.example.pause();
  //   //   state.audio.lyric.stop();
  // },
  // canplay: function (state, callback) {
  //   console.log('可播放状态');
  //   // state.audio.lyric.play();
  //   callback && (state.audio.example.oncanplay = callback);
  // },
  // lyric: function (state, lyric) {
  //   console.log(state);
  //   console.log(lyric);
  //   if (!lyric) return;
  //   // if (!lyric) lyric = state.lyric;
  //   return new LyricParser(lyric, function ({ lineNum, txt }) {
  //     console.log(`lineNum = ${lineNum}, txt = ${txt}`);
  //     state.audio.lyric.curLine = lineNum; // 歌词实时下标
  //   })
  // },

  // import LyricParser from "lyric-parser"; // 歌词解析


}
import LyricParser from "lyric-parser"; // 歌词解析
export default {

  play: function (state) {
    console.log('播放');
    state.audio.isPlaying = true;
    state.audio.example.play();
    state.audio.lyric.play();
  },
  pause: function (state) {
    console.log('暂停');
    state.audio.isPlaying = false;
    state.audio.example.pause();
    state.audio.lyric.stop();
  },
  stop: function (state) {
    console.log('停止');
    state.isPlaying = false;
    state.audio.example.stop();
    state.audio.lyric.stop();
  },
  timeupdate: function (state, callback) { // 状态更新
    console.log('状态更新');
    callback && (state.audio.example.ontimeupdate = callback);
  },

  lyric: function (state, lyric) {
    console.log(state);
    console.log(lyric);
    if (!lyric) return;
    // if (!lyric) lyric = state.lyric;
    return new LyricParser(lyric, function ({ lineNum, txt }) {
      console.log(`lineNum = ${lineNum}, txt = ${txt}`);
      state.audio.lyric.curLine = lineNum; // 歌词实时下标
    })
  },




















  keepAlivesPush(state, component) {
    // 对指定组件进行动态更改缓存（缓存）--组件调用该方法时，判断该组件是否存在于该缓存数组，无则添加
    let keepAlives = state.keepAlives;
    !keepAlives.includes(component) && keepAlives.push(component);
  },
  keepAlivesDel(state, component) {
    // 对指定组件进行动态更改缓存（不缓存）--组件调用该方法时，从缓存数组中删除对应的组件元素
    let keepAlives = state.keepAlives;
    let index = keepAlives.indexOf(component);
    index > -1 && keepAlives.splice(index, 1);
  },
}
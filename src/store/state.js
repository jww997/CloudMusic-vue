import { getCookie, setCookie, delCookie } from "@/assets/js/util.js";

const list = [{
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

  music: {
    id: -1,             // 标识号
    isShow: false,      // 显示
    isPlaying: false,   // 状态
    isDraging: false,   // 拖拽
    duration: "",       // 总时间
    currentTime: "",    // 当前时间

    currentIndex: -1,   // 播放下标
    currentList: [],    // 播放列表
    current: {},        // 播放当前
    url: "",            // 播放地址

    modeIndex: 0,       // 模式下标
    modeList: list,     // 模式列表

    volume: 60,         // 音量
  },
  mv: {
    id: -1,             // 标识号
    isShow: false,      // 显示
    isPlaying: false,   // 状态
    isDraging: false,   // 拖拽
    duration: "",       // 总时间
    currentTime: "",    // 当前时间
  },

  login: {
    cookie: getCookie("cookie"),
  },

  playlistToast: false,   // 播放列表显示隐藏
}
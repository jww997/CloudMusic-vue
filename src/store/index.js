import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import getters from "@/store/getters.js"
import mutations from "@/store/mutations.js"
import actions from "@/store/actions.js"

const store = new Vuex.Store({
  state: {
    // keepAlives: ['Discover', 'Player'], // 保存缓存的列表

    audio: {
      example: new Audio(), // 实例
      isPlaying: false,
      current: {}, // 当前播放的音乐信息
      lyric: {}, // 歌词
    }
  },
  // getters,
  mutations,
  actions,
})

export default store;
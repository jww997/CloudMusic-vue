import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import mutations from "@/store/mutations.js"
import actions from "@/store/actions.js"

const store = new Vuex.Store({
  state: {
    keepAlives: ['Discover', 'Player'], // 保存缓存的列表

    audio: new Audio(), // 音频
    isPlaying: false,

  },
  mutations,
  actions,
})

// const store = new Vue({
//   // state
//   data() {
//     return {
//       count: 0
//     }
//   },
//   // view
//   template: `
//     <div>{{ count }}</div>
//   `,
//   // actions
//   methods: {
//     increment() {
//       this.count++
//     }
//   }
// })


export default store;
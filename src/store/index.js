import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import mutations from "@/store/mutations.js"
import actions from "@/store/actions.js"

const store = new Vuex.Store({
  state: {
    keepAlives: ['Discover'], // 保存缓存的列表
  },
  mutations,
  actions,
})

export default store;
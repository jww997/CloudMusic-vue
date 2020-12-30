/**
 * @Author: Gavin
 * @Begin: 2020-12-30 10:49:29
 * @Update: 2020-12-30 10:49:29
 * @Update log: 状态管理
 */
import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state.js"
import getters from "./getters.js"
import mutations from "./mutations.js"
import actions from "./actions.js"

Vue.use(Vuex);
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})

export default store;
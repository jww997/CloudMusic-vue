import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,

    keepAlives: ['discover'],
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },


  // iskeepAlive(state, component) {
  //   !state.catchArr.includes(component) && state.catchArr.push(component);
  // },
  // // 对指定组件进行动态更改缓存（不缓存）--组件调用该方法时，从缓存数组中删除对应的组件元素
  // noKeepAlive(state, component) {
  //   let index = state.catchArr.indexOf(component);
  //   index > -1 && state.catchArr.splice(index, 1);
  // },


  // router.beforeEach((to, from, next) => {
  //     if (keepAliveArr.indexOf(to.name) != -1) {
  //       store.commit('iskeepAlive', to.name);
  //       next();
  // }


})

Vue.prototype.$store = store;
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import 'css/reset.css'
import 'css/border.css'
import 'css/iconfont.css'

import 'js/thirdparty.js' // 第三方整合
import 'js/filter.js' // 过滤操作
import 'js/util.js' // 工具箱

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
})



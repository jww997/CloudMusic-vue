// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'styles/reset.css'
import 'styles/border.css'
import 'styles/iconfont.css'

import '@/assets/js/vant.js'
import '@/assets/js/filter.js'
// import '@/assets/js/axios.js'

import store from '@/store'
import api from "@/api"
// Vue.prototype.$store = store
Vue.prototype.$api = api

Vue.config.productionTip = false


import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
})



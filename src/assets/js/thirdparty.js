/**
 * @Author: Gavin
 * @Begin: 2020-12-30 10:49:29
 * @Update: 2021-2-25 16:46:29
 * @Update log: 第三方整合
 */
import Vue from 'vue'
import api from "@/api"

import 'amfe-flexible/index.js' // rem 动态适配
import './vant.js' // 有赞
// import './antd.js'

Vue.prototype.$api = api;








// Vue.config.devtools = true // 开发调试工具
// Vue.config.productionTip = false // 阻止启动生产消息



// import infiniteScroll from 'vue-infinite-scroll'

// Vue.use(infiniteScroll)
// Vue.config.productionTip = false

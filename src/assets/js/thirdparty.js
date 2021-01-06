/**
 * @Author: Gavin
 * @Begin: 2020-12-30 10:49:29
 * @Update: 2020-12-30 10:49:29
 * @Update log: 第三方整合
 */
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import api from "@/api"

import 'amfe-flexible/index.js' // rem 动态适配

import {
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  Progress,
  NavBar,
  PullRefresh,
  Slider,
  Skeleton,
  ImagePreview, // 图片放大预览，支持函数调用和组件调用两种方式。
} from "vant";

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Progress);
Vue.use(NavBar);
Vue.use(PullRefresh);
Vue.use(Slider);
Vue.use(Skeleton);
Vue.use(ImagePreview);

Vue.use(VueAxios, axios);
Vue.prototype.$api = api;
Vue.prototype.$preview = ImagePreview;

Vue.config.devtools = true // 开发调试工具
Vue.config.productionTip = false // 阻止启动生产消息





import BScroll from '@better-scroll/core'
import Pulldown from '@better-scroll/pull-down'
import infiniteScroll from 'vue-infinite-scroll'
BScroll.use(Pulldown)

Vue.use(infiniteScroll)
Vue.config.productionTip = false
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
} from "vant";

Vue.config.devtools = true // 开发调试工具
Vue.prototype.$api = api;
Vue.use(VueAxios, axios);

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Progress);
Vue.use(NavBar);
Vue.use(PullRefresh);
Vue.use(Slider);
Vue.use(Skeleton);





import BScroll from '@better-scroll/core'
import Pulldown from '@better-scroll/pull-down'
import infiniteScroll from 'vue-infinite-scroll'
BScroll.use(Pulldown)

Vue.use(infiniteScroll)
Vue.config.productionTip = false
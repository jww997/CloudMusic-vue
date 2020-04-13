// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import VueAwesomeSwiper from "vue-awesome-swiper";
import fastClick from "fastclick";
import axios from "axios";
Vue.prototype.$axios = axios; //在Vue的原型上添加$axios方法

import "./assets/fonts/iconfont.css";
import "./assets/styles/common.css";
import "./assets/styles/reset.css";
import "./assets/styles/border.css";
import "swiper/dist/css/swiper.css";

fastClick.attach(document.body);
Vue.use(VueAwesomeSwiper /* { default global options } */);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

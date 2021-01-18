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
  Skeleton, // 用于在内容加载过程中展示一组占位图形。
  Popup, // 弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。
  Icon, // 基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组件中通过 icon 属性引用。
  Image as VanImage, // 增强版的 img 标签，提供多种图片填充模式，支持图片懒加载、加载中提示、加载失败提示。

  ImagePreview, // 图片放大预览，支持函数调用和组件调用两种方式。
  Dialog, // 弹出模态框，常用于消息提示、消息确认，或在当前页面内完成特定的交互操作。弹出框组件支持函数调用和组件调用两种方式。
  Notify, // 在页面顶部展示消息提示，支持函数调用和组件调用两种方式。
  Toast, // 在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。
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
Vue.use(Popup);
Vue.use(Icon);
Vue.use(VanImage);

Vue.use(ImagePreview);
Vue.use(Dialog);
Vue.use(Notify);
Vue.use(Toast);


Vue.use(VueAxios, axios);
Vue.prototype.$api = api;

Vue.prototype.$vant = new Object(); // 防止报错
Vue.prototype.$vant.ImagePreview = ImagePreview;
Vue.prototype.$vant.Dialog = Dialog;
Vue.prototype.$vant.Notify = Notify;
Vue.prototype.$vant.Toast = Toast;


// Vue.config.devtools = true // 开发调试工具
Vue.config.productionTip = false // 阻止启动生产消息



// import infiniteScroll from 'vue-infinite-scroll'

// Vue.use(infiniteScroll)
// Vue.config.productionTip = false
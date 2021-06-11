import Vue from "vue"
import Router from "vue-router"

Vue.use(Router);

const routers = {
  routes: [
    {
      path: "*",
      redirect: "/discover",
    },
    {
      // alias: "发现",
      path: "/discover",
      name: "discover",
      component: () => import("@/pages/discover"),
      meta: {
        keepAlive: true,
        enterAnimationName: "fade",
        leaveAnimationName: "",
      },
    },
    {
      // alias: "我的",
      path: "/mine",
      name: "mine",
      component: () => import("@/pages/mine"),
      meta: { keepAlive: true },
    },
    {
      // alias: "歌单详情",
      path: "/playlist/:id",
      name: "playlist",
      component: () => import("@/pages/playlist"),
      // meta: { keepAlive: true },
    },
    {
      // alias: "评论",
      path: "/comment/:id",
      name: "comment",
      component: () => import("@/pages/comment"),
    },
    {
      // alias: "每日推荐",
      path: "/dailyspecial",
      name: "dailyspecial",
      component: () => import("@/pages/dailyspecial"),
    },
    {
      // alias: "歌单广场",
      path: "/square",
      name: "square",
      component: () => import("@/pages/square"),
      // meta: { keepAlive: true },
    },
    {
      // alias: "排行榜",
      path: "/toplist",
      name: "toplist",
      component: () => import("@/pages/toplist"),
      // meta: { keepAlive: true },
    },
    {
      // alias: "搜索",
      path: "/search",
      name: "search",
      component: () => import("@/pages/search"),
    },
    {
      // alias: "播放器",
      path: "/player",
      name: "player",
      component: () => import("@/pages/player"),
    },
    {
      // alias: "视频",
      path: "/mv",
      name: "mv",
      component: () => import("@/pages/mv"),
    },
    {
      // alias: "登录",
      path: "/login",
      name: "login",
      component: () => import("@/pages/login"),
    },
  ],
  // 重置滚动条位置
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
}

const router = new Router(routers);

export default router;

// 全局前置守卫
import { formatTime, formatDate } from "@/assets/js/filter.js";
router.beforeEach((to, from, next) => {
  console.log("全局前置守卫");
  console.log(`to = `, to);
  console.log(`from = `, from);

  console.log(`欢迎来到村乐，网易云音乐的搬运工！(说明：本项目仅用于学习，无任何商业用途，也请勿用于商业！如有侵权，请联系删除！1551005987@qq.com)`);
  console.log(`[${formatDate(undefined, 2)} ${formatTime()}], https://github.com/jww997/CloudMusic-wx <小程序版>, https://github.com/jww997/CloudMusic-vue <VUE版>`);
  // console.log(`需求墙：1. 播放页加个分享功能`);

  next();
})
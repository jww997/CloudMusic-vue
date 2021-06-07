import Vue from "vue"
import Router from "vue-router"

Vue.use(Router);

const setting = {
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
      meta: { keepAlive: true }
    },
    {
      // alias: "歌单详情",
      path: "/playlist/:id",
      name: "playlist",
      component: () => import("@/pages/playlist"),
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
    },
    {
      // alias: "排行榜",
      path: "/toplist",
      name: "toplist",
      component: () => import("@/pages/toplist"),
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
  ]
}

const router = new Router(setting);

export default router;


//   scrollBehavior(to, from, savedPosition) {
//     return { x: 0, y: 0 }
//   }


// 全局导航守卫
// router.beforeEach((to, from, next) => {
//   // 对组件B进行动态缓存
//   const that = this;
//   // if (to.name == "Discover") {
//   store.commit("keepAlivesDel", to.name);
//   next();
//   // }
// })

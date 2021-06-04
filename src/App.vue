<template>
  <div id="app" class="app">
    <!-- 动画效果 fade-淡出淡入 drawer-抽屉 -->
    <transition name="fade">
      <router-view style="height: 100%" />
    </transition>
    <music />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import {
  getLocalStorage,
  setLocalStorage,
  delLocalStorage,
} from "@/assets/js/util.js";
import { formatTime, formatDate } from "@/assets/js/filter.js";

import Music from "@/base/music";
export default {
  name: "App",
  components: {
    Music,
  },
  provide() {
    // 父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    const that = this;
    return {
      reload: that.reload,
    };
  },
  data: function () {
    return {
      // isShowTopBar: true,
      isShowBottomBar: true,

      isRouterAlive: true, // 控制视图是否显示的变量
    };
  },
  // watch: {
  //   $route(to, from) {
  //     const that = this;
  //     let drawer = ["mv", "player"];

  //     console.log(to);
  //     console.log(from);

  //     console.log(`to.path = `, to.path);
  //     console.log(`from.path = `, from.path);

  //     const toDepth = to.path.split("/").length;
  //     const fromDepth = from.path.split("/").length;

  //     console.log(`toDepth = ${toDepth}, fromDepth = ${fromDepth}`);

  //     that.setTranstion(toDepth == 3 || fromDepth == 3 ? "drawer" : "fade");
  //   },
  // },
  methods: {
    reload() {
      const that = this;
      that.isRouterAlive = false; // 先关闭
      that.$nextTick(function () {
        that.isRouterAlive = true; // 再打开
      });
    },
    ...mapMutations({
      setTranstion: "SET_TRANSITION",
    }),
  },
  mounted: function () {
    const that = this;
    console.log(`欢迎来到村乐，网易云音乐的搬运工！`);
    console.log(`说明：本项目仅用于学习，无任何商业用途，也请勿用于商业！`);
    console.log(`说明：如有侵权，请联系删除！1551005987@qq.com`);
    console.log(`小程序版 https://github.com/jww997/CloudMusic-wx`);
    console.log(`VUE版 https://github.com/jww997/CloudMusic-vue`);
    console.log(formatDate(undefined, 2), formatTime()); // undefined还是有点用
    console.log(`需求墙：1. 播放页加个分享功能 2. 加个调音量(已完成)`);

    if (!getLocalStorage("history")) setLocalStorage("history", []);
  },
};
</script>

<style lang="scss">
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.app {
  height: 100vh;

  // 动画
  .fade-enter-active,
  .fade-leave-active,
  .drawer-enter-active,
  .drawer-leave-active {
    transition: 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    transform: scale(1.5) translateY(2rem);
    opacity: 0;
  }
  .drawer-enter,
  .drawer-leave-to {
    transform: translateY(100%);
  }
}
</style>


<template>
  <div id="app" class="app">
    <!-- 动画效果 fade-淡出淡入 drawer-抽屉 -->
    <transition :name="!keepAlive && 'fade'">
      <keep-alive>
        <router-view class="router-view" v-if="keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade">
      <router-view class="router-view" v-if="!keepAlive"></router-view>
    </transition>
    <!-- 选项栏 -->
    <transition name="drawer">
      <tabbar v-if="tabbar.includes(this.$route.name)" />
    </transition>
    <!-- 播放条 -->
    <transition name="drawer">
      <playbar :class="`fixed-${tabbar.includes(this.$route.name) ? 2 : 1}`" />
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
import Tabbar from "@/components/tabbar.vue";
import Playbar from "@/components/playbar.vue";

export default {
  name: "App",
  components: {
    Music,
    Tabbar,
    Playbar,
  },
  data() {
    return {
      tabbar: ["discover", "mine"],
    };
  },
  computed: {
    keepAlive() {
      console.log(this.$route.meta.keepAlive);
      return this.$route.meta.keepAlive;
    },
  },
  // watch: {
  //   $route(c) {
  //     console.log(c);
  //   },
  // },

  provide() {
    // 父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    const that = this;
    return {
      reload: that.reload,
    };
  },
  methods: {
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
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.app {
  height: 100vh;
  font-family: $base-font-family;
  .router-view {
    min-height: calc(100vh - 50px);
  }

  // 底部排列
  .fixed-1,
  .fixed-2 {
    position: fixed;
    z-index: 9999;
  }
  .fixed-1 {
    bottom: 0;
  }
  .fixed-2 {
    bottom: 50px;
  }

  // 动画
  .fade-enter-active,
  .fade-leave-active,
  .drawer-enter-active,
  .drawer-leave-active {
    transition: $animation-duration-base;
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


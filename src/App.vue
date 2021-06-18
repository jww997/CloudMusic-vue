<template>
  <div id="app" class="app">
    <!-- 动画效果 fade<淡出淡入> drawer<抽屉> -->
    <transition :name="KeepAliveName">
      <keep-alive>
        <router-view v-if="keepAlive" class="router-view" />
      </keep-alive>
    </transition>
    <transition :name="routerViewName">
      <router-view v-if="!keepAlive" class="router-view" />
    </transition>
    <!-- 播放条 -->
    <transition name="drawer">
      <playbar v-if="isShowPlaybar" :class="playbarClassName" />
    </transition>
    <!-- 底部选项栏 -->
    <transition name="drawer">
      <tabbar v-if="isShowTabbar" class="fixedBottom-1" />
    </transition>
    <!-- 加载提示 -->
    <loading :show="loading" />
    <!-- {{loading}} -->
    <!-- 音乐控件 -->
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
import Tabbar from "@/components/tabbar.vue";
import Playbar from "@/components/playbar.vue";
import Loading from "@/components/loading.vue";
import Music from "@/components/music.vue";

export default {
  name: "App",
  components: {
    Tabbar,
    Playbar,
    Loading,
    Music,
  },
  data() {
    return {
      tabbar: ["discover", "mine"],
      drawer: ["player", "mv"],

      KeepAliveName: "",
      routerViewName: "",

      // isShowLoading: true,
    };
  },
  computed: {
    keepAlive() {
      return this.$route.meta.keepAlive;
    },
    isShowTabbar() {
      return this.tabbar.includes(this.$route.name);
    },
    isShowPlaybar() {
      return !this.drawer.includes(this.$route.name);
    },
    playbarClassName() {
      return `fixedBottom-${this.isShowTabbar ? 2 : 1}`;
    },
    ...mapGetters(["loading"]),
  },
  watch: {
    // 监听路由变化
    $route(to, from) {
      const { keepAlive: toKeepAlive } = to.meta;
      const { keepAlive: fromKeepAlive } = from.meta;

      if (this.drawer.includes(to.name)) {
        this.KeepAliveName = "";
        this.routerViewName = "drawer";
      } else {
        this.KeepAliveName = "";
        this.routerViewName = "";
      }

      // const { enterAnimationName, leaveAnimationName } = to.meta;
      // this.KeepAliveName = enterAnimationName;
      // this.routerViewName = leaveAnimationName;

      // if (toKeepAlive && fromKeepAlive) {
      //   this.KeepAliveName = "";
      //   this.routerViewName = "fade";
      // } else if (toKeepAlive) {
      //   this.KeepAliveName = "";
      //   this.routerViewName = "";
      // } else if (fromKeepAlive) {
      //   this.KeepAliveName = "";
      //   this.routerViewName = "";
      // }
    },
  },
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

    if (!getLocalStorage("history")) setLocalStorage("history", []);
  },
};
</script>

<style lang="scss">
@import "~sass/var.scss";
@import "~sass/mixins.scss";
@keyframes turn {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.app {
  min-height: 100vh;
  font-family: $base-font-family;
  // 路由界面
  .router-view {
    min-height: calc(100vh - 50px);
    background-color: $background-color;
    color: $text-color;
  }
  // 字体图标
  .iconfont {
    font-size: $font-size-sm * 1.5;
  }
  // 上下边缘排列
  .fixedTop-1,
  .fixedTop-2,
  .fixedBottom-1,
  .fixedBottom-2 {
    position: fixed;
  }
  .fixedTop-1 {
    top: 0;
  }
  .fixedTop-1 {
    top: 50px;
  }
  .fixedBottom-1 {
    bottom: 0;
  }
  .fixedBottom-2 {
    bottom: 50px;
  }

  // 动画集合
  .fade-enter-active,
  .fade-leave-active,
  .drawer-enter-active,
  .drawer-leave-active {
    transition: $animation-duration-base;
  }
  .fade-enter,
  .fade-leave-to,
  .drawer-enter,
  .drawer-leave-to {
    opacity: 0;
  }
  .fade-enter,
  .fade-leave-to {
    transform: scale(1.5) translateY(2rem);
  }
  .drawer-enter,
  .drawer-leave-to {
    transform: translateY(100%);
  }
}
</style>


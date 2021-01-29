<template>
  <div class="container">
    <topbar></topbar>
    <!-- <scroll :data="blocks" :refreshDelay="1000"> -->
    <div class="blocks">
      <div v-for="(item, index) in blocks" :key="index">
        <banner
          :ball="ball"
          :list="item.extInfo.banners"
          v-if="item.showType == 'BANNER'"
        ></banner>

        <whirligig
          :list="item.creatives"
          :uielement="item.uiElement"
          v-if="item.showType == 'HOMEPAGE_SLIDE_PLAYLIST'"
        ></whirligig>
      </div>
    </div>
    <!-- </scroll> -->
    <transition name="second">
      <router-view class="second"></router-view>
    </transition>
  </div>
</template>

<script>
import Scroll from "@/components/scroll";

import Banner from "./components/banner";
import Whirligig from "./components/whirligig";
import Calendar from "./components/calendar";

import Topbar from "@/components/topbar";

export default {
  name: "discover",
  components: {
    Scroll,
    Topbar,

    Banner,
    Whirligig,
    Calendar,
  },
  data: function () {
    return {
      blocks: [],
      ball: [],
    };
  },
  mounted: function () {
    const that = this;
    that.$api
      .getHomepageBlockPage()
      .then((res) => {
        that.blocks = res.data.data.blocks;
        return that.$api.getHomepageDragonBall();
      })
      .then((res) => {
        that.ball = res.data.data;
      });
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.container {
  height: 100%;
  overflow: scroll;
  .blocks {
    z-index: $zIndex-M;
  }
  .second {
    z-index: $zIndex-L;
    @include suspension;

    &.second-enter,
    &.second-leave-to {
      opacity: 0;
      transform: translateY(1rem);
    }

    &.second-enter-to,
    &.second-leave {
      opacity: 1;
    }

    &.second-enter-active,
    &.second-leave-active {
      transition: 0.5s;
    }
  }
}
</style>

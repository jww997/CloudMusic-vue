<template>
  <div class="container">
    <topbar></topbar>
    <!-- <scroll :data="blocks" :refreshDelay="1000"> -->

    <!-- class="blocks" -->
    <van-pull-refresh v-model="isLoading" @refresh="refresh" :head-height="80">
      <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
      <template #pulling="props">
        <img
          class="doge"
          src="https://img01.yzcdn.cn/vant/doge.png"
          :style="{ transform: `scale(${props.distance / 80})` }"
        />
      </template>

      <!-- 释放提示 -->
      <template #loosing>
        <img class="doge" src="https://img01.yzcdn.cn/vant/doge.png" />
      </template>

      <!-- 加载提示 -->
      <template #loading>
        <img class="doge" src="https://img01.yzcdn.cn/vant/doge-fire.jpg" />
      </template>

      <div v-for="(item, index) in blocks" :key="index">
        <bowling v-if="index == 0"></bowling>

        <!-- <banner
          :ball="ball"
          :list="item.extInfo.banners"
          v-if="item.showType == 'BANNER'"
        ></banner> -->

        <whirligig
          :list="item.creatives"
          :uielement="item.uiElement"
          v-if="item.showType == 'HOMEPAGE_SLIDE_PLAYLIST'"
        ></whirligig>

        <!-- :creatives="item.creatives"
          :uielement="item.uiElement" -->
        <slide-songlist-align
          v-if="item.showType == 'HOMEPAGE_SLIDE_SONGLIST_ALIGN'"
          :content="item"
        ></slide-songlist-align>
      </div>
    </van-pull-refresh>
    <!-- </scroll> -->
    <transition name="second">
      <router-view class="second"></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import Bowling from "./components/bowling";
import Whirligig from "./components/whirligig";
import slideSonglistAlign from "./components/slide-songlist-align";

import Scroll from "@/base/scroll";
import Banner from "./components/banner";
import Calendar from "./components/calendar";
import Topbar from "@/components/topbar";

export default {
  name: "discover",
  components: {
    Bowling,
    Whirligig,
    slideSonglistAlign,

    Scroll,
    Topbar,
    Banner,
    Calendar,
  },
  inject: ["reload"],
  data: function () {
    return {
      blocks: [],

      isLoading: false,
    };
  },
  computed: {
    ...mapState(["login"]),
  },
  watch: {
    login: {
      handler(newVal, oldVal) {
        const that = this;
        that.refresh();
      },
      deep: true,
    },
  },
  methods: {
    refresh: function () {
      const that = this;
      that.reload();
      that.$vant.Toast.success("刷新成功");
      that.isLoading = false;
    },
  },
  mounted: function () {
    const that = this;
    that.$api.getHomepageBlockPage().then((res) => {
      that.blocks = res.data.data.blocks;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.container {
  height: 100%;
  position: relative;
  // min-height: 100vh;
  overflow: scroll;

  >>> .van-pull-refresh {
    height: 100%;
  }

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
  .doge {
    width: 140px;
    height: 72px;
    margin-top: 8px;
    border-radius: 4px;
  }
}
</style>

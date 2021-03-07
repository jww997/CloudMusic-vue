<template>
  <div class="discover">
    <topbar></topbar>
    <!-- <scroll :data="blocks" :refreshDelay="1000"> -->

    <!-- class="blocks" -->
    <van-pull-refresh
      v-model="isLoading"
      head-height="80"
      @refresh.stop="refresh"
    >
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
        <!-- :ball="ball" -->
        <!-- :list="item.extInfo.banners" -->
        <!-- v-if="item.showType == 'BANNER'" -->
        <banner :list="banners" v-if="index == 0"></banner>

        <bowling v-if="index == 0"></bowling>

        <whirligig
          :list="item.creatives"
          :uielement="item.uiElement"
          v-if="item.showType == 'HOMEPAGE_SLIDE_PLAYLIST'"
        ></whirligig>

        <slide-songlist-align
          v-if="item.showType == 'HOMEPAGE_SLIDE_SONGLIST_ALIGN'"
          :content="item"
        ></slide-songlist-align>
      </div>
    </van-pull-refresh>
    <!-- </scroll> -->

    <transition :name="transition">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

// import pageSecond from "@/base/page-second";

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
    // pageSecond,
  },
  inject: ["reload"],
  data: function () {
    return {
      blocks: [],
      banners: [],

      isLoading: false,

    };
  },
  computed: {
    ...mapGetters(["login", "transition"]),
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
    getdata() {
      const that = this;
      that.$api
        .getHomepageBlockPage({ refresh: true })
        .then((res) => {
          that.blocks = res.data.data.blocks;
          return that.$api.getBanner();
        })
        .then((res) => {
          that.banners = res.data.banners;
        });
    },
  },
  mounted: function () {
    const that = this;
    that.getdata();
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.discover {
  height: 100%;
  position: relative;
  // min-height: 100vh;
  overflow: scroll;

  >>> .van-pull-refresh {
    // height: 100%;
    overflow: scroll;
  }

  // .blocks {
  //   z-index: $zIndex-M;
  // }

  .doge {
    width: 140px;
    height: 72px;
    margin-top: 8px;
    border-radius: 4px;
  }
}
</style>

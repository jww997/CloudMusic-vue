<template>
  <div class="discover">
    <topbar></topbar>

    <height-clear />
    <refresh :isLoading="isLoading" @refresh="refresh">
      <div v-for="(item, index) in blocks" :key="index">
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
      <height-clear />
    </refresh>

    <bottombar></bottombar>

    <transition :name="transition">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import heightClear from "@/base/height-clear";

import Refresh from "@/common/refresh";

import Bowling from "./components/bowling";
import Whirligig from "./components/whirligig";
import slideSonglistAlign from "./components/slide-songlist-align";

import Bottombar from "@/common/bottombar";

import Scroll from "@/base/scroll";
import Banner from "./components/banner";
import Calendar from "./components/calendar";
import Topbar from "@/components/topbar";

export default {
  name: "discover",
  components: {
    heightClear,

    Bowling,
    Whirligig,
    slideSonglistAlign,

    Bottombar,

    Scroll,
    Topbar,
    Banner,
    Calendar,
    Refresh,
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
    cookie() {
      const that = this;
      return that.login.cookie;
    },
    ...mapGetters(["login", "transition"]),
  },
  watch: {
    cookie(newVal, oldVal) {
      const that = this;
      that.refresh();
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
  overflow: scroll;

  z-index: $zIndex-S;
}
</style>

<template>
  <div class="discover">
    <topbar></topbar>

    <height-clear />
    <!-- <refresh :isLoading="isLoading" @refresh="refresh"> -->

    <div v-for="(item, index) in blocks" :key="index">
      <template v-if="item.showType == 'BANNER'">
        <!-- 轮播图 -->
        <banner :list="banners"></banner>
        <!-- 保龄球 -->
        <bowling></bowling>
      </template>
      <template v-else-if="item.showType == 'HOMEPAGE_SLIDE_PLAYLIST'">
        <!-- 旋转木马1 -->
        <whirligig :block="item"></whirligig>
      </template>
      <template v-else-if="item.showType == 'HOMEPAGE_SLIDE_SONGLIST_ALIGN'">
        <!-- 旋转木马2 -->
        <whirligig :block="item2"></whirligig>





        <div style="background-color: #eee; font-size: 14px">
          {{ index }} - {{ item.showType }}
        </div>
      </template>
      <template v-else>
        <!-- 其他 -->
        <div style="background-color: #eee; font-size: 14px">
          {{ index }} - {{ item.showType }}
        </div>
      </template>
    </div>

    <height-clear v-if="music.isPlaying" />
    <!-- </refresh> -->

    <bottombar></bottombar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Banner from "./components/banner";
import Bowling from "./components/bowling";
import Whirligig from "./components/whirligig";
import Whirligig2 from "./components/whirligig2";

import heightClear from "@/base/height-clear";
import Refresh from "@/common/refresh";
import Bottombar from "@/common/bottombar";
import Scroll from "@/base/scroll";
import Calendar from "./components/calendar";
import Topbar from "@/components/topbar";

export default {
  name: "discover",
  components: {
    Banner,
    Bowling,
    Whirligig,
    Whirligig2,

    Bottombar,
    heightClear,
    Scroll,
    Topbar,
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
    ...mapGetters(["music", "login", "transition"]),
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
</style>

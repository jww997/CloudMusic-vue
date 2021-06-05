<template>
  <div class="discover">
    <topbar></topbar>

    <height-clear />
    <!-- <refresh :isLoading="isLoading" @refresh="refresh"> -->

    <div v-for="(item, index) in blocks" :key="index">
      <!-- <div style="border: 1px solid #f00; font-size: 14px">
        {{ index }} - {{ item.showType }}
      </div> -->
      <template v-if="banner.includes(item.showType)">
        <!-- 轮播图 -->
        <banner :list="banners"></banner>
        <!-- 保龄球 -->
        <bowling></bowling>
      </template>
      <template v-else-if="whirligig.includes(item.showType)">
        <!-- 旋转木马1 -->
        <whirligig :block="item"></whirligig>
      </template>
      <template v-else-if="whirligig2.includes(item.showType)">
        <!-- 旋转木马2 -->
        <whirligig2 :block="item"></whirligig2>
      </template>
      <template v-else-if="calendar.includes(item.showType)">
        <!-- 音乐日历 -->
        <calendar :block="item"></calendar>
      </template>
      <template v-else>
        <!-- 其他 -->
      </template>
    </div>

    <height-clear />
    <!-- </refresh> -->

    <bottombar></bottombar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Banner from "./banner.vue";
import Bowling from "./bowling.vue";
import Whirligig from "./whirligig.vue";
import Whirligig2 from "./whirligig2.vue";
import Calendar from "./calendar.vue";

import heightClear from "@/base/height-clear";
import Refresh from "@/common/refresh";
import Bottombar from "@/common/bottombar";
import Scroll from "@/base/scroll";
import Topbar from "@/components/topbar";

export default {
  name: "discover",
  components: {
    Banner,
    Bowling,
    Whirligig,
    Whirligig2,
    Calendar,

    Bottombar,
    heightClear,
    Scroll,
    Topbar,
    Refresh,
  },
  inject: ["reload"],
  data: function () {
    return {
      blocks: [],
      banners: [],
      isLoading: false,

      banner: ["BANNER"],
      whirligig: ["HOMEPAGE_SLIDE_PLAYLIST"],
      whirligig2: [
        "HOMEPAGE_SLIDE_SONGLIST_ALIGN",
        "HOMEPAGE_NEW_SONG_NEW_ALBUM",
      ],
      calendar: ["SHUFFLE_MUSIC_CALENDAR"],
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
.discover {
  background-color: #eee;
}
</style>

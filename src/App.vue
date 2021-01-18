<template>
  <div class="app" id="app">
    <div class="topbar" v-if="isShowTopBar">
      <!-- <topbar></topbar> -->
    </div>

    <div class="view">
      <!-- <scroll :data="isShowBottomBar" :refreshDelay="500"> -->
      <keep-alive>
        <router-view v-if="$route.meta.isKeepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.isKeepAlive"></router-view>
      <!-- </scroll> -->
    </div>
    <div class="bottombar" v-if="isShowBottomBar">
      <bottombar></bottombar>
    </div>

    <bottomlist :playlistToast="playlistToast"></bottomlist>
    <music></music>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { formatTime, formatDate } from "@/assets/js/filter.js";
import Bottomlist from "@/components/bottomlist";
import Bottombar from "@/components/bottombar";
import Topbar from "@/components/topbar";
import Tabbar from "@/components/tabbar";
import Scroll from "@/components/scroll";
import Music from "@/components/music";
export default {
  name: "App",
  components: {
    Bottomlist,
    Bottombar,
    Topbar,
    Tabbar,
    Scroll,
    Music,
  },
  computed: {
    ...mapGetters([
      "currentSong",
      "currentTime",
      "duration",

      "playId",
      "playIndex",

      "playlist",
      "playUrl",

      "playState",
      "playDrag",
      "playlistToast",

      "playSequence",
      "playMode",
    ]),
  },
  data: function () {
    return {
      isShowTopBar: true,
      isShowBottomBar: true,
    };
  },
  mounted: function () {
    const that = this;
    console.log(`欢迎来到村乐，网易云音乐的搬运工！`);
    console.log(`说明：本项目仅用于学习，无任何商业用途，也请勿用于商业！`);
    console.log(`说明：如有侵权，请联系删除！1551005987@qq.com`);
    console.log(`小程序版 https://github.com/jww997/CloudMusic-wx`);
    console.log(`VUE版 https://github.com/jww997/CloudMusic-vue`);
    console.log(formatDate(undefined, 2), formatTime()); // undefined还是有点用
    console.log(`需求墙：1. 播放页加个分享功能 2. 加个调音量`);
  },
  created: function () {
    const that = this;
    let top = ["discover"];
    let bottom = ["player", "mv"];
    that.$router.beforeEach((to, from, next) => {
      that.isShowTopBar = !!top.find((item) => {
        return item == to.name;
      });
      that.isShowBottomBar = !bottom.find((item) => {
        return item == to.name;
      });
      next();
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
body,
.app {
  height: 100vh;
  overflow: hidden;
}
.app {
  display: flex;
  flex-direction: column;
  .view {
    flex-grow: 1;
    z-index: $zIndex-S;
    overflow: hidden;
  }
  .topbar,
  .bottombar {
    flex-shrink: 0;
    z-index: $zIndex-M;
    display: flex;
  }
}
</style>


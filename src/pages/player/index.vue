<template>
  <div class="player" :style="{ backgroundImage: `url(${picUrl})` }">
    <!-- 顶部导航栏 -->
    <navbar
      :title="title"
      :subtitle="subtitle"
      beforeIconName="arrow-down"
    ></navbar>
    <!-- 背景遮罩层 -->
    <div class="backgroundMask"></div>
    <!-- 歌词 -->
    <lyric :lyric="lyric" v-if="isShowLyric" @handleClick="toggleShowLyric"></lyric>
    <!-- 唱片机 -->
    <phonograph :cover="picUrl" v-else @handleClick="toggleShowLyric"></phonograph>
    <!-- 控制歌曲 -->
    <handle :lyric="lyric"></handle>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Navbar from "../playlist/components/navbar.vue";
import Handle from "./handle.vue";

import { formatLyric, formatArtists } from "@/assets/js/filter.js";
import LyricParser from "lyric-parser"; // 歌词解析
import Phonograph from "./phonograph.vue";
import Lyric from "./lyric.vue";
export default {
  name: "player",
  components: {
    Navbar,
    Handle,

    Phonograph,
    Lyric,
  },
  data: function () {
    const that = this;
    return {
      isShowLyric: false,
      lyric: {},

      picUrl: "",
      title: "",
      subtitle: "",

      lastId: -1, // 减少没必要的歌词请求
    };
  },
  computed: {
    current() {
      const that = this;
      return that.music.current;
    },
    ...mapGetters(["music"]),
  },
  watch: {
    current(val, oldVal) {
      const that = this;
      that.update(val);
      that.getLyric();
    },
  },
  methods: {
    formatArtists,
    toggleShowLyric: function () {
      const that = this;
      that.isShowLyric = !that.isShowLyric;
      that.getLyric();
    },
    getLyric: function () {
      const that = this;
      let id = that.music.current.id;
      if (!that.isShowLyric) return false;
      if (that.lastId == id) return false;
      that.$api.getLyric({ id }).then((res) => {
        let nolyric = res.data.nolyric;
        if (nolyric) return false; // 判断数据有无歌词
        let lyric = res.data.lrc.lyric;
        if (!lyric) return false; // 判断数据歌词是否为空
        try {
          clearInterval(that.lyric.timer); // 清掉没用的
          that.lyric = new LyricParser(lyric, that.setLyric);
          that.lastId = id;
        } catch (e) {}
      });
    },
    setLyric: function ({ lineNum, txt }) {
      const that = this;
      if (that.lyric.curLine == lineNum) return false;
      that.$set(that.lyric, "curLine", lineNum); // 歌词实时下标
      console.log(`lineNum = ${lineNum}, txt = ${txt}`);
    },

    update(val) {
      const that = this;
      that.picUrl = val.al.picUrl;
      that.title = val.name;
      that.subtitle = that.formatArtists(val.ar);
    },
  },
  mounted: function () {
    const that = this;
    try {
      that.update(that.music.current);
    } catch (error) {}
  },
  destroyed: function () {
    const that = this;
    try {
      clearInterval(that.lyric.timer); // 避免定时器残留，导致歌词抖动
    } catch (error) {}
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.player {
  height: 100vh;
  overflow: hidden;
  background: center no-repeat;
  background-size: 0;
  z-index: 300;
  display: flex;
  flex-direction: column;
  .backgroundMask {
    @include positionCenter;
    background: inherit;
    background-size: cover;
    -webkit-filter: blur(10px);
    filter: blur(10px);
    &::after {
      content: "";
      @include positionCenter;
      background-color: $black;
      opacity: $active-opacity;
    }
  }
}
</style>
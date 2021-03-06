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
    <lyric
      :lyric="lyric"
      @seekLyric="seekLyric"
      v-if="isShowLyric"
      @handleClick="toggleShowLyric"
    ></lyric>
    <!-- 唱片机 -->
    <phonograph
      :cover="picUrl"
      v-else
      @handleClick="toggleShowLyric"
    ></phonograph>
    <!-- 控制歌曲 -->
    <handle :lyric="lyric"></handle>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Navbar from "@/components/navbar";
import Handle from "./handle";

import { formatLyric, formatDate, formatArtists } from "@/assets/js/filter.js";
import LyricParser from "lyric-parser"; // 歌词解析
import Phonograph from "./phonograph";
import Lyric from "./lyric";
export default {
  name: "player",
  components: {
    Navbar,
    Handle,

    Phonograph,
    Lyric,
  },
  data() {
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
    toggleShowLyric() {
      const that = this;
      that.isShowLyric = !that.isShowLyric;
      that.getLyric();
    },
    getLyric() {
      const that = this;
      let { id } = that.music.current;
      if (!that.isShowLyric && that.lastId == id) return false;
      that.$api.getLyric({ id }).then((res) => {
        const {
          nolyric,
          lrc: { lyric },
        } = res.data;
        if (nolyric && !lyric) return false;
        that.lyric = {
          lrc: lyric,
          lines: formatLyric(lyric),
          curLine: 0,
          state: 0,
        };
        that.lastId = id;
      });
    },
    seekLyric(val) {
      const { lines } = this.lyric;
      lines.map((item, index) => {
        item.time < val && (this.lyric.curLine = index);
      });
    },

    

    update(val) {
      const that = this;
      that.picUrl = val.al.picUrl;
      that.title = val.name;
      that.subtitle = that.formatArtists(val.ar);
    },
  },
  mounted() {
    try {
      this.update(this.music.current);
    } catch (error) {}
  },
  destroyed() {
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
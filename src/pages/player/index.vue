<template>
  <div class="container" :style="{ backgroundImage: 'url(' + picUrl + ')' }">
    <navbar :title="title" :subtitle="subtitle" :fixed="false"></navbar>
    <div :class="{ song: true, lyric: isShowLyric }" @click="toggleShowLyric">
      <!-- <transform name="center" appear> -->
      <lyric :lyric="lyric" v-show="isShowLyric"></lyric>
      <phonograph :picUrl="picUrl" v-show="!isShowLyric"></phonograph>
      <!-- </transform> -->
    </div>
    <handle :lyric="lyric" @seekLyric="seekLyric"></handle>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { formatLyric } from "@/assets/js/filter.js";
import LyricParser from "lyric-parser"; // 歌词解析
import Navbar from "@/components/navbar";
import Phonograph from "./components/phonograph";
import Handle from "./components/handle";
import Lyric from "./components/lyric";
export default {
  name: "player",
  components: {
    Navbar,
    Phonograph,
    Handle,
    Lyric,
  },
  data: function () {
    const that = this;
    return {
      isShowLyric: false,
      lyric: {},
      // nolyric: true,

      picUrl: "",
      title: "",
      subtitle: "",

      lastId: -1, // 减少没必要的歌词请求
    };
  },
  computed: {
    ...mapGetters([
      "playState",
      "playUrl",
      "playIndex",
      "playlist",

      "currentSong",
      "currentTime",
      "duration",
    ]),
  },
  watch: {
    currentSong: function (val) {
      const that = this;
      that.picUrl = val.al.picUrl;
      that.subtitle = val.ar[0].name;
      that.title = val.name;
      that.getLyric();
    },
  },
  methods: {
    toggleShowLyric: function () {
      const that = this;
      that.isShowLyric = !that.isShowLyric;
      if (that.isShowLyric) that.getLyric();
    },
    getLyric: function () {
      const that = this;
      let id = that.currentSong.id;
      if (that.lastId == id) return false;
      that.$api
        .getLyric({
          id: id,
        })
        .then((res) => {
          let nolyric = res.data.nolyric;
          if (nolyric) return false; // 判断数据有无歌词
          let lyric = res.data.lrc.lyric;
          if (!lyric) return false; // 判断数据歌词是否为空
          try {
            clearInterval(that.lyric.timer); // 清掉没用的
          } catch (e) {}
          that.lyric = new LyricParser(lyric, that.setLyric);
          that.lastId = id;
        });
    },
    setLyric: function ({ lineNum, txt }) {
      const that = this;
      if (that.lyric.curLine == lineNum) return false;
      console.log(`lineNum = ${lineNum}, txt = ${txt}`);
      that.lyric.curLine = lineNum; // 歌词实时下标
    },
    seekLyric: function (time) {
      const that = this;
      that.lyric.seek(time);
    },

    ...mapMutations({ setPlayUrl: "SET_PLAY_URL" }),
  },
  mounted: function () {
    const that = this;
    try {
      that.picUrl = that.currentSong.al.picUrl;
      that.subtitle = that.currentSong.ar[0].name;
      that.title = that.currentSong.name;
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
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.container {
  height: 100vh;
  @include suspension;
  @include flexSpaceBetween;
  flex-direction: column;

  background: center no-repeat transparent;
  background-size: 0;
  overflow: hidden;
  // background-size: cover;
  // -webkit-backdrop-filter: saturate(180%) blur(20px);
  // backdrop-filter: saturate(180%) blur(20px);
  // position: relative;
  // overflow: hidden;

  &::before,
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    @include positionCenter;
  }
  &::before {
    z-index: -1;
    background-color: #000;
    opacity: 0.5;
  }
  &::after {
    z-index: -2;
    background: inherit;
    background-size: cover;
    -webkit-filter: blur(20px);
    filter: blur(20px);
  }

  // &.center-enter,
  // &.center-leave-to {
  //   opacity: 0;
  //   transform: translateY(1rem);
  // }

  // &.center-enter-to,
  // &.center-leave {
  //   opacity: 1;
  // }

  // &.center-enter-active,
  // &.center-leave-active {
  //   transition: 0.5s;
  // }

  .song {
    flex-grow: 1;
    width: 100%;
    min-height: 5rem;

    &.lyric {
      overflow: hidden;
      mask-image: linear-gradient(
        rgba(255, 255, 255, 0),
        #fff 40%,
        #fff 60%,
        rgba(255, 255, 255, 0)
      );
      -webkit-mask-image: linear-gradient(
        rgba(255, 255, 255, 0),
        #fff 40%,
        #fff 60%,
        rgba(255, 255, 255, 0)
      );
    }

    // &.fade-enter,
    // &.fade-leave-to {
    //   opacity: 0;
    //   // transform: translateY(100%);
    //   // top: 100%;
    // }

    // &.fade-enter-to,
    // &.fade-leave {
    //   opacity: 1;
    //   // top: 0;
    //   // bottom: 0;
    // }

    // &.fade-enter-active,
    // &.fade-leave-active {
    //   transition: 0.5s;
    // }
  }
}
</style>
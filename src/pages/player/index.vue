<template>
  <!-- <transition name="fade"> -->
  <div
    class="container"
    :style="{ backgroundImage: 'url(' + song.al.picUrl + ')' }"
    v-if="song"
  >
    <navbar
      :title="song.name"
      :subtitle="song.ar[0].name"
      :fixed="false"
    ></navbar>
    <phonograph :obj="song" :isPlaying="isPlaying"></phonograph>
    <!-- <lyric :list="lyric"></lyric> -->
    <handle :isPlaying="isPlaying"></handle>
  </div>
  <!-- </transition> -->
</template>

<script>
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
      isPlaying: that.$store.state.isPlaying,
      songs: [],
      lyric: [],
    };
  },
  computed: {
    song: function () {
      const that = this;
      return that.songs[0];
    },
  },
  created: function () {
    const that = this;
    let id = that.$route.query.id;
    that.$api
      .getSongDetail({ ids: id })
      .then((res) => {
        that.songs = res.data.songs;
        return that.$api.getSongUrl({
          id: that.song.id,
        });
      })
      .then((res) => {
        // that.$store.commit("pause");
        // that.$store.state.audio.example = new Audio(res.data.data[0].url);
        that.$store.state.audio.example.src = res.data.data[0].url;
        that.$store.state.audio.current = res.data.data[0];
        // that.$store.commit("play");

        return that.$api.getLyric({
          id: that.song.id,
        });
      })
      .then((res) => {
        console.log(res.data.lrc.lyric);
        that.lyric = res.data.lrc.lyric;
        let lyric = new LyricParser(
          res.data.lrc.lyric,
          function ({ lineNum, txt }) {
            console.log(lineNum);
            console.log(txt);
          }
        );
        lyric.play();
      });
  },
  mounted: function () {
    const that = this;
    setTimeout(() => {
      that.$store.commit("play");
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
.container {
  @include suspension;
  background: center no-repeat transparent;
  background-size: 0;
  // background-size: cover;
  // -webkit-backdrop-filter: saturate(180%) blur(20px);
  // backdrop-filter: saturate(180%) blur(20px);
  position: relative;
  overflow: hidden;

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
    // background-color: #000;
    background-size: cover;
    -webkit-filter: blur(20px);
    filter: blur(20px);
  }
  // .container {
  //   height: auto;
  //   &::before {
  //     display: none;
  //   }
  //   &::after {
  //     display: none;
  //   }
  // }

  // &.fade-enter,
  // &.fade-leave-to {
  //   // opacity: 0;
  //   // transform: translateY(100%);
  //   top: 100%;
  // }

  // &.fade-enter-to,
  // &.fade-leave {
  //   // opacity: 1;
  //   top: 0;
  //   bottom: 0;
  // }

  // &.fade-enter-active,
  // &.fade-leave-active {
  //   transition: 0.5s;
  // }
}
</style>
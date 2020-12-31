<template>
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
    <div :class="{ song: true, lyric: isShowLyric }" @click="toggleShowLyric">
      <!-- <transition name="fade"> -->
      <lyric :lyric="lyric" v-show="isShowLyric"></lyric>
      <phonograph :phonograph="song" v-show="!isShowLyric"></phonograph>
      <!-- </transition> -->
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
      isShowLyric: true,
      songs: [],
      lyric: {},
    };
  },
  computed: {
    song: function () {
      const that = this;
      return that.songs[0];
    },
    ...mapGetters(["playState", "currentTime", "duration"]),
  },
  watch: {
    // currentTime: function (val, newval) {
    //   const that = this;
    //   that.lyric && that.lyric.seek(newval);
    // },
  },
  methods: {
    toggleShowLyric: function () {
      const that = this;
      that.isShowLyric = !that.isShowLyric;
      that.lyric.togglePlay();
    },
    seekLyric: function (time) {
      const that = this;
      that.lyric.seek(time);
    },
    setLyric: function ({ lineNum, txt }) {
      const that = this;
      console.log(`lineNum = ${lineNum}, txt = ${txt}`);
      that.lyric.curLine = lineNum; // 歌词实时下标
    },
    ...mapMutations({ setPlayUrl: "SET_PLAY_URL" }),
  },
  created: function () {
    const that = this;
    let id = that.$route.query.id;
    // console.log("创建");
    // console.log(that.lyric);
    that.$api
      .getSongDetail({ ids: id })
      .then((res) => {
        that.songs = res.data.songs;
        // return that.$api.getSongUrl({
        //   id: that.song.id,
        // });
      })
      .then((res) => {
        // let url = res.data.data[0].url;
        // that.setPlayUrl(url);

        // that.$store.state.audio.current = res.data.data[0];
        // that.$store.state.audio.example.src = res.data.data[0].url;

        // console.log(that.$store.getters);
        // console.log(that.$store.state);

        // that.$store.state.audio.example.autoplay = true;

        return that.$api.getLyric({
          id: that.song.id,
        });
      })
      .then((res) => {
        let lyric = res.data.lrc.lyric;
        if (!lyric) return false;
        try {
          clearInterval(that.lyric.timer); // 清掉没用的
        } catch (e) {}
        that.lyric = new LyricParser(lyric, that.setLyric);

        // that.$store.commit("play");

        // let audio = that.$store.state.audio;
        // debugger;
        // console.log(that.$store.getters.lyric);
        // debugger;
        // let { getLyric } = that.$store.getters;
        // that.lyric = formatLyric(lyric);
        // audio.lyric.source = lyric;
        // audio.lyric.derivant = formatLyric(lyric);

        // console.log(getLyric(lyric));

        // audio.lyric = getLyric(lyric);

        // that.$store.commit("canplay", () => {
        //   that.$store.state.audio.lyric.play();;
        // });
      });
  },
  // mounted: function () {
  //   const that = this;
  //   console.log("创建");
  //   console.log(that.lyric);
  //   setTimeout(() => {
  //     that.$store.commit("play");
  //     // that.$store.lyric.play();
  // }, 1000);
  // },

  // destroyed: function () {
  //   const that = this;
  //   console.log("销毁");
  // },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.container {
  @include suspension;
  @include flexSpaceBetween;
  flex-direction: column;

  background: center no-repeat transparent;
  background-size: 0;
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

  .song {
    // height: 10rem;
    flex-grow: 1;

    // mask-image: linear-gradient(
    //   rgba(255, 255, 255, 0),
    //   #fff 40%,
    //   #fff 60%,
    //   rgba(255, 255, 255, 0)
    // );
    // -webkit-mask-image: linear-gradient(
    //   rgba(255, 255, 255, 0),
    //   #fff 40%,
    //   #fff 60%,
    //   rgba(255, 255, 255, 0)
    // );

    overflow: hidden;

    &.lyric {
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

    // flex-basis: 10rem;

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
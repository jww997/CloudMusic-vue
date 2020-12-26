<template>
  <transition name="fade">
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
      <handle :isPlaying="isPlaying"></handle>
    </div>
  </transition>
</template>

<script>
import Navbar from "@/components/navbar";
import Phonograph from "./components/phonograph";
import Handle from "./components/handle";
export default {
  name: "player",
  components: {
    Navbar,
    Phonograph,
    Handle,
  },
  data: function () {
    const that = this;
    return {
      isPlaying: that.$store.state.isPlaying,
      songs: [],
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
        that.$store.commit("play");
      });
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
.container {
  width: 100vw;
  height: 100vh;
  background: center no-repeat transparent;
  background-size: 0;
  // background-size: cover;
  // -webkit-backdrop-filter: saturate(180%) blur(20px);
  // backdrop-filter: saturate(180%) blur(20px);
  position: relative;
  overflow: hidden;
  position: fixed;
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

  &.fade-enter,
  &.fade-leave-to {
    // opacity: 0;
    // transform: translateY(100%);
    top: 100%;
  }

  &.fade-enter-to,
  &.fade-leave {
    // opacity: 1;
    top: 0;
  }

  &.fade-enter-active,
  &.fade-leave-active {
    transition: 0.5s;
  }
}
</style>
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

      <!-- <audio id="audio" src="http://m7.music.126.net/20201225221627/93f9982b705e6e97f20ac302ea27f12d/ymusic/782f/b210/c82d/a2403f9916efa7e3b74ca1a10301257c.mp3" v-if="url" controls="controls" autoplay></audio> -->
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
  watch: {},
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
        that.$store.state.audio.src = res.data.data[0].url;
        // that.isPlaying = that.$store.state.isPlaying;
      });
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
.container {
  height: 100vh;
  background: center no-repeat;
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
  .container {
    height: auto;
    &::before {
      display: none;
    }
    &::after {
      display: none;
    }
  }

  &.fade-enter,
  &.fade-leave-to {
    opacity: 0;
    transform: translateY(1rem);
  }

  &.fade-enter-to,
  &.fade-leave {
    opacity: 1;
  }

  &.fade-enter-active,
  &.fade-leave-active {
    transition: 0.5s;
  }
}
</style>
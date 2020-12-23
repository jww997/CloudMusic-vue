<template>
  <transition name="fade">
    <div
      class="container"
      :style="{ backgroundImage: 'url(' + songs[0].al.picUrl + ')' }"
    >
      <navbar
        :title="songs[0].name"
        :subtitle="songs[0].ar[0].name"
        :fixed="false"
      ></navbar>
      <phonograph :obj="songs[0]"></phonograph>
      <handle></handle>
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
    return {
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
    console.log(id);
    that.$api.getSongDetail({ ids: id }).then((res) => {
      // console.log(res);
      that.songs = res.data.songs;
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
  .container {
    height: auto;
  }
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    z-index: -1;
    background: inherit;
    background-size: cover;
    @include positionCenter;
    -webkit-filter: blur(20px);
    filter: blur(20px);
  }

  &.fade-enter,
  &.fade-leave-to {
    opacity: 0;
    transform: translateY(1rem);
  }

  &.fade-enter-active,
  &.fade-leave-active {
    transition: 0.5s;
  }
}
</style>
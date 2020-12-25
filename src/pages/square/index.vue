<template>
  <div class="container">
    <navbar :title="'歌单广场'" fixed>·</navbar>

    <tab></tab>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import Tab from "@/pages/square/components/tab";

export default {
  name: "square",
  components: {
    Navbar,
    Tab,
  },
  data: function () {
    return {
      sub: [],
    };
  },
  mounted: function () {
    const that = this;
    that.$api.getPlaylistCatlist();
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
.container {
  width: 100%;
  height: 100%;
  padding-top: 1rem;
  box-sizing: border-box;
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

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

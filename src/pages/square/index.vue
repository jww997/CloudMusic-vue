<template>
  <div class="container">
    <navbar :title="'歌单广场'" fixed black>·</navbar>

    <!-- <tab></tab> -->
    <list :list="playlists"></list>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import Tab from "@/pages/square/components/tab";
import List from "@/pages/square/components/list";

export default {
  name: "square",
  components: {
    Navbar,
    Tab,
    List,
  },
  data: function () {
    return {
      playlists: [],
    };
  },
  mounted: function () {
    const that = this;
    that.$api.getPlaylistHot().then((res) => {});
    that.$api
      .getTopPlaylist({
        limit: 30,
      })
      .then((res) => {
        that.playlists = res.data.playlists;
      });
    // that.$api.getPlaylistCatlist().then((res) => {});
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.container {
  @include suspension;
  box-sizing: border-box;
  padding-top: 1rem;
}
</style>

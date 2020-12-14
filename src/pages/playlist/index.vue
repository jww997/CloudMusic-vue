<template>
  <div class="container">
    <navbar :title="'歌单'"></navbar>
    <cap :obj="playlist"></cap>
    <list :obj="playlist"></list>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import Cap from "@/pages/playlist/components/cap";
import List from "@/pages/playlist/components/list";
export default {
  name: "Playlist",
  components: {
    Navbar,
    Cap,
    List,
  },
  data: function () {
    return {
      playlist: {},
    };
  },
  activated: function () {
    const that = this;
    let id = that.$route.query.id;
    that.$api.getPlaylistDetail({ id }).then((res) => {
      console.log(id);
      that.playlist = res.data.playlist;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
</style>
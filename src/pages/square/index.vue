<template>
  <div class="container">
    <navbar :title="'歌单广场'" fixed black></navbar>
    <tags :list="tags"></tags>
    <list :list="playlists"></list>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import Tags from "./components/tags";
import List from "./components/list";

export default {
  name: "square",
  components: {
    Navbar,
    Tags,
    List,
  },
  data: function () {
    return {
      playlists: [],
      tags: [],
    };
  },
  methods: {
    getdata: function () {
      const that = this;
      that.$api
        .getTopPlaylist({
          limit: 50,
        })
        .then((res) => {
          that.playlists = res.data.playlists;
        });
    },
  },
  mounted: function () {
    const that = this;

    that.$api.getPlaylistCatlist().then((res) => {
      console.log(res);
      that.tags = res.data.sub;

      that.getdata();
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.container {
  @include suspension;
  box-sizing: border-box;
  padding-top: $safeDistance;
}
</style>

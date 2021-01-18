<template>
  <scroll :data="[playlists]" :refreshDelay="1000">
    <div class="container">
      <navbar :title="'歌单广场'" fixed black></navbar>
      <!-- <tags :list="tags" @toggleCat="toggleCat"></tags> -->
      <list :list="playlists"></list>
    </div>
  </scroll>
</template>

<script>
import Scroll from "@/components/scroll";
import Navbar from "@/components/navbar";
import Tags from "./components/tags";
import List from "./components/list";

export default {
  name: "square",
  components: {
    Scroll,
    Navbar,
    Tags,
    List,
  },
  data: function () {
    return {
      playlists: [],
      tags: [],
      cat: "",
    };
  },
  watch: {
    cat: function (val) {
      const that = this;
      that.getdata();
    },
  },
  methods: {
    toggleCat: function (name) {
      const that = this;
      that.cat = name;
    },
    getdata: function () {
      const that = this;
      that.$api
        .getTopPlaylist({
          limit: 50,
          cat: that.cat,
        })
        .then((res) => {
          that.playlists = res.data.playlists;
        });
    },
  },
  mounted: function () {
    const that = this;
    that.$api.getPlaylistCatlist().then((res) => {
      that.tags = res.data.sub;
    });
    that.getdata();
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

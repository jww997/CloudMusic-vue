<template>
  <scroll
    :data="playlists"
    :refreshDelay="1000"
    :pullup="true"
    @scrollToEnd="scrollToEnd"
  >
    <div class="container">
      <navbar :title="'歌单广场'" fixed black></navbar>
      <tags :list="tags" @toggleCat="toggleCat"></tags>
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
      // total: -1,
    };
  },
  watch: {
    cat: function (val) {
      const that = this;
      that._initData();
      that.getdata();
    },
  },
  methods: {
    _initData() {
      const that = this;
      that.playlists = [];
      that.total = -1;
    },
    toggleCat: function (name) {
      const that = this;
      that.cat = name;
    },
    scrollToEnd: function () {
      const that = this;
      // console.log(that.total == that.playlists.length);
      // if (that.total == that.playlists.length) return false;
      console.log("到底");
      that.getdata();
    },
    getdata: function () {
      const that = this;
      if (that.total == that.playlists.length) return false;
      that.$api
        .getTopPlaylist({
          cat: that.cat,
          offset: that.playlists.length,
        })
        .then((res) => {
          let playlists = res.data.playlists;
          that.total = res.data.total;
          if (!that.playlists.length) {
            that.playlists = playlists;
          } else {
            that.playlists = that.playlists.concat(playlists);
          }
        });
    },
  },
  mounted: function () {
    const that = this;
    that._initData();
    that.getdata();
    that.$api.getPlaylistCatlist().then((res) => {
      that.tags = res.data.sub;
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

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
      <van-loading
        class="loading"
        size="24px"
        v-if="isLoading && total != playlists.length"
        >加载中...</van-loading
      >
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
      total: -1,

      isLoading: false,
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
      that.isLoading = true;
      that.$api
        .getTopPlaylist({
          limit: 18,
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
          that.isLoading = false;
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
  .loading {
    padding: 0.5rem 0;
    text-align: center;
  }
}
</style>

<template>
  <div class="square">
    <!-- 顶部导航条 -->
    <navbar class="navbar" title="歌单广场" />
    <!-- 标签 -->
    <tags :list="tags" @toggleCat="toggleCat" />
    <!-- 歌单列表 -->
    <matrix
      :list="playlists"
      destination="playlist"
      @scrollToEnd="scrollToEnd"
    />
    <placeholder />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Navbar from "@/components/navbar";
import Placeholder from "@/components/placeholder";

import Matrix from "@/common/matrix";
import Tags from "./tags";

export default {
  name: "square",
  components: {
    Navbar,

    Placeholder,
    Matrix,
    Tags,
  },
  data: function () {
    return {
      playlists: [],
      tags: [],
      cat: "",
      total: -1,

      // isLoading: false,
    };
  },
  computed: {
    ...mapGetters(["music", "transition"]),
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
      if (that.total == that.playlists.length) return false;
      that.getdata();
    },
    getdata: function () {
      const that = this;
      if (that.total == that.playlists.length) return false;
      // that.isLoading = true;
      that.$api
        .getTopPlaylist({
          limit: 30,
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
          // that.isLoading = false;
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
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.square {
  .navbar {
    background-color: $background-color;
    color: $black;
  }
}
</style>

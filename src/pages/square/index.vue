<template>
  <div class="square">
    <!-- 顶部导航条 -->
    <navbar class="navbar" title="歌单广场" />
    <!-- 标签 -->
    <tags
      :list="tags"
      :labelIndex="labelIndex"
      @handleLabelClick="handleLabelClick"
    />
    <!-- 歌单列表 -->
    <list :list="playlists" />

    <placeholder />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Navbar from "@/components/navbar";
import Tags from "./tags";
import List from "./list";

import Placeholder from "@/components/placeholder";

export default {
  name: "square",
  components: {
    Navbar,
    Tags,
    List,

    Placeholder,
  },
  data: function () {
    return {
      playlists: [],
      tags: [],
      cat: "综艺",
      total: -1,
      labelIndex: 0,

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

    handleLabelClick(val, index) {
      const { name } = val;
      this.cat = name;
      this.labelIndex = index;
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
    background-color: $white;
    color: $text-color;
  }
}
</style>

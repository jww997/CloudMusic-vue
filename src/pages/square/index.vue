<template>
  <div class="square">
    <!-- 顶部导航栏 -->
    <navbar class="navbar" title="歌单广场" />
    <!-- 标签 -->
    <tags
      :list="tags"
      :labelIndex="labelIndex"
      @handleLabelClick="handleLabelClick"
    />
    <!-- 歌单列表 -->
    <list :list="playlists" @handleScrollBottom="handleScrollBottom" />

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
  data() {
    return {
      playlists: [],
      tags: [],
      cat: "综艺",
      total: -1,
      labelIndex: 0,

      offset: 1, // 偏移数量
      before: "", 

      // isLoading: false,
    };
  },
  computed: {
    ...mapGetters(["music", "transition"]),
  },
  watch: {
    cat(val) {
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
    // 触底加载
    handleScrollBottom() {
      console.log(1);
      this.offset++;
      this.getdata();
    },

    handleLabelClick(val, index) {
      const { name } = val;
      this.cat = name;
      this.labelIndex = index;
    },

    toggleCat(name) {
      const that = this;
      that.cat = name;
    },
    scrollToEnd() {
      const that = this;
      if (that.total == that.playlists.length) return false;
      that.getdata();
    },
    getdata() {
      const that = this;
      // if (that.total <= that.playlists.length) return false;
      that.$api
        .getTopPlaylist({
          cat: that.cat,
          offset: that.playlists.length,
        })
        .then((res) => {
          const { playlists, total } = res.data;
          that.total = total;
          this.offset == 1
            ? (that.playlists = playlists)
            : that.playlists.push(...playlists);
        });
    },
  },
  mounted() {
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

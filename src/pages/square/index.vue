<template>
  <div class="square">
    <navbar :title="'歌单广场'" fixed black backgroundColor="#fff"></navbar>

    <height-clear />
    <tags :list="tags" @toggleCat="toggleCat"></tags>
    <matrix
      :list="playlists"
      destination="playlist"
      @scrollToEnd="scrollToEnd"
    ></matrix>
    <height-clear />

    <!-- <scroll
      :data="playlists"
      :refreshDelay="1000"
      :pullup="true"
      @scrollToEnd="scrollToEnd"
    > -->

    <!-- <list :list="playlists"></list> -->

    <!-- <van-loading class="loading" size="24px">加载中...</van-loading> -->
    <!-- v-if="isLoading && total != playlists.length" -->
    <!-- </scroll> -->

    <!--  -->

    <transition :name="transition">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import heightClear from "@/base/height-clear";

import Matrix from "@/common/matrix";

import Bottombar from "@/common/bottombar";

import Navbar from "@/common/navbar";
import Tags from "./components/tags";
// import List from "./components/list";

export default {
  name: "square",
  components: {
    heightClear,

    Matrix,
    Bottombar,
    // Scroll,
    Navbar,
    Tags,
    // List,
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
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.square {
  @include suspension;
}
</style>

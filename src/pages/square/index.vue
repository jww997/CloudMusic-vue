<template>
  <div class="container">
    <navbar :title="'歌单广场'" fixed black backgroundColor="#fff"></navbar>
    <!-- <tags :list="tags" @toggleCat="toggleCat"></tags> -->

    <matrix :list="playlists" destination="square/playlist" @scrollToEnd="scrollToEnd"></matrix>

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

    <transition name="thirdly">
      <router-view class="thirdly"></router-view>
    </transition>
  </div>
</template>

<script>
import Matrix from "@/common/matrix";

import Navbar from "@/common/navbar";
import Tags from "./components/tags";
// import List from "./components/list";

export default {
  name: "square",
  components: {
    Matrix,

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
.container {
  @include suspension;
  // padding-top: $safeDistance + 1rem;
  // padding-bottom: $safeDistance;
  padding: $safeDistance 0;
  box-sizing: border-box;
  //   overflow: hidden;
  //   .loading {
  //     padding: 0.5rem 0;
  //     text-align: center;
  //   }

  .thirdly {
    z-index: $zIndex-L;
    @include suspension;

    &.thirdly-enter,
    &.thirdly-leave-to {
      opacity: 0;
      transform: translateY(1rem);
    }

    &.thirdly-enter-to,
    &.thirdly-leave {
      opacity: 1;
    }

    &.thirdly-enter-active,
    &.thirdly-leave-active {
      transition: 0.5s;
    }
  }
}
</style>

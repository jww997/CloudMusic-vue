<template>
  <div class="search">
    <navbar fixed black title="搜索" backgroundColor="white"></navbar>

    <input
      class="input"
      type="text"
      placeholder="请输入搜索内容"
      v-model="keywords"
      @change="getSearch"
    />

    <!-- <history></history> -->
    <hot @getHotSearch="getHotSearch" v-if="!list.length"></hot>
    <list :list="list" v-else></list>
  </div>
</template>

<script>
import Navbar from "@/common/navbar";
import List from "@/common/list";

import History from "./components/history";
import Hot from "./components/hot";

export default {
  name: "search",
  components: {
    Navbar,
    History,
    Hot,

    List,
  },
  data() {
    return { keywords: "", list: [], count: 0 };
  },
  watch: {
    keywords(val, oldVal) {
      const that = this;
      if (!val) {
        that._reset();
      }
    },
  },
  methods: {
    getSearch() {
      const that = this;
      if (!that.keywords) return false;
      that.$api
        .getCloudSearch({
          keywords: that.keywords,
        })
        .then((res) => {
          that.list = res.data.result.songs;
          that.count = res.data.result.songCount;
        });
    },
    getHotSearch(val) {
      const that = this;
      that.keywords = val;
      that.getSearch();
    },
    _reset() {
      const that = this;
      that.list = [];
      that.count = 0;
    },
  },
  mounted() {
    const that = this;
    that._reset();
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.search {
  height: 100%;
  @include suspension;
  padding-top: $safeDistance;
  box-sizing: border-box;
  overflow: scroll;

  .input {
    height: 1rem;
    margin: 0 $text-S 1rem;
    font-size: $text-S;
    border-bottom: 1px solid $theme-GRAY;
  }
}
</style>
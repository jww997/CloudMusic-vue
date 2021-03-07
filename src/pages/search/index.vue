<template>
  <div class="search">
    <navbar fixed black backgroundColor="white">
      <div class="seek">
        <input
          class="input"
          type="text"
          autofocus
          :placeholder="searchDefault.showKeyword"
          v-model="keywords"
          @change="getdata()"
        />
        <!-- @keydown="getSearch(keywords || searchDefault.realkeyword)" -->
        <van-icon
          class="clear"
          name="cross"
          @click="clearKeywords"
          v-if="keywords"
        />
      </div>
    </navbar>

    <history
      :list="history"
      @getSearch="getSearch"
      @clearHistory="clearHistory"
      v-if="history.length"
    ></history>
    <hot @getSearch="getSearch" v-if="!list.length"></hot>
    <list :list="list" v-else></list>
  </div>
</template>

<script>
import Navbar from "@/common/navbar";
import List from "@/common/list";

import Bottombar from "@/common/bottombar";

import History from "./components/history";
import Hot from "./components/hot";

export default {
  name: "search",
  components: {
    Navbar,
    History,
    Bottombar,
    Hot,

    List,
  },
  data() {
    return {
      keywords: null,
      history: [],

      list: [],
      count: 0,

      searchDefault: {},
    };
  },
  watch: {
    keywords(val, oldVal) {
      const that = this;
      console.log(val);
      if (!val) that.clearList();
    },
  },
  methods: {
    getSearch(val) {
      const that = this;

      if (that.keywords == val) return false;
      that.keywords = val;
      that.getdata();
    },
    getdata() {
      const that = this;

      // if (that.keywords == null) that.keywords = that.searchDefault.realkeyword;
      that.$api
        .getCloudSearch({
          keywords: that.keywords,
        })
        .then((res) => {
          that.list = res.data.result.songs;
          that.count = res.data.result.songCount;

          let history = that.history;
          if (history.indexOf(that.keywords) == -1) history.push(val);
          history.reverse();
        });
    },

    clearKeywords() {
      const that = this;
      that.keywords = null;
    },
    clearHistory() {
      const that = this;
      that.history = [];
    },
    clearList() {
      const that = this;
      that.list = [];
      that.count = 0;
    },
  },
  mounted() {
    const that = this;
    that.clearKeywords();
    that.clearHistory();
    that.clearList();

    that.$api
      .getSearchDefault()
      .then((res) => {
        that.searchDefault = res.data.data;
      })
      .catch((res) => {
        that.searchDefault = { showKeyword: "请输入搜索内容" };
      });
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.search {
  @include suspension;
  padding: $safeDistance 0;
  z-index: $zIndex-M;
  .seek {
    width: 100%;
    height: $text-XXL;
    margin-right: $text-XS;
    @include flexSpaceBetween;
    font-size: $text-S;
    position: relative;
    .input {
      width: 100%;
      border-bottom: 1px solid $theme-GRAY;
    }
    .clear {
      width: $text-L;
      height: $text-L;
      @include positionCenter;
      @include flexCenter;
      left: auto;
    }
  }
}
</style>
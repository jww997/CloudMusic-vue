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
          @change="getdata"
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

    <!-- :list="history" -->
    <!-- v-if="history.length" -->
    <history @getSearch="getSearch"></history>
    <hot @getSearch="getSearch" v-if="!list.length"></hot>
    <list :list="list" v-else></list>

    <bottombar></bottombar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import {
  getLocalStorage,
  setLocalStorage,
  delLocalStorage,
} from "@/assets/js/util.js";
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

      list: [],
      count: 0,

      searchDefault: {},
    };
  },
  computed: {
    history() {
      const that = this;
      return that.login.history;
    },
    ...mapGetters(["login"]),
  },
  watch: {
    keywords(val, oldVal) {
      const that = this;
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
      let keywords = that.keywords;
      let history = that.history;
      that.$api
        .getCloudSearch({
          keywords,
        })
        .then((res) => {
          that.list = res.data.result.songs;
          that.count = res.data.result.songCount;
          let index = history.indexOf(keywords);
          if (index != -1) history.splice(index, 1);
          history.unshift(keywords);
          setLocalStorage("history", history);
        });
    },

    clearKeywords() {
      const that = this;
      that.keywords = null;
    },
    // clearHistory() {
    //   const that = this;
    //   that.history = [];
    // },
    clearList() {
      const that = this;
      that.list = [];
      that.count = 0;
    },
  },
  mounted() {
    const that = this;
    that.clearKeywords();
    // that.clearHistory();
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
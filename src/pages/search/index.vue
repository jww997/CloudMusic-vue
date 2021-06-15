<template>
  <div class="search">
    <!-- 顶部导航栏 -->
    <navbar class="navbar">
      <template slot="addonMiddle">
        <div class="seek">
          <input
            class="input"
            type="text"
            autofocus
            :placeholder="searchDefault.showKeyword"
            v-model="keywords"
            @change="getdata"
          />
          <van-icon
            class="clear"
            name="cross"
            @click="clearKeywords"
            v-if="keywords"
          />
        </div>
      </template>
    </navbar>

    <history @getSearch="getSearch" />
    <hot @getSearch="getSearch" v-if="!list.length" />
    <template v-else>
      <playall class="playall" :list="list" />
      <songs :list="list" />
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import {
  getLocalStorage,
  setLocalStorage,
  delLocalStorage,
} from "@/assets/js/util.js";
import Navbar from "@/components/navbar";
import History from "./history";
import Hot from "./hot";
import Playall from "../playlist/playall";
import Songs from "../playlist/songs";

export default {
  name: "search",
  components: {
    Navbar,
    History,
    Hot,
    Playall,
    Songs,
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
@import "~sass/var.scss";
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.search {
  background-color: $white;
  .navbar {
    background-color: $white;
    color: $text-color;
  }
  .playall {
    background-color: $white;
    top: 50px;
  }
  .seek {
    margin: 0 $padding-sm;
    font-size: $font-size-lg;
    position: relative;
    .input {
      width: 100%;
      border-bottom: $border-width-base solid $border-color;
    }
    .clear {
      font-size: $font-size-sm;
      @include flexCenter;
      @include positionCenter;
      left: auto;
    }
  }
}
</style>
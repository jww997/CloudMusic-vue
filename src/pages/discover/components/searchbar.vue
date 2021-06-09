<template>
  <div class="searchbar">
    <van-icon class="wapNav" name="wap-nav" @click="showPopup" />
    <van-search
      class="input"
      background="transparent"
      placeholder="请输入搜索关键词"
      v-model="value"
      disabled
      @click="toPages({ name: 'search' })"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { toPages } from "@/assets/js/util.js";

export default {
  name: "searchbar",
  methods: {
    toPages,
  },
  // mounted() {
  //   const that = this;
  //   that.$api.getLoginStatus().then((res) => {
  //     let profile = res.data.profile;
  //     if (localStorage.length > 0)
  //       localStorage.profile = JSON.stringify(profile);
  //   });
  // },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.searchbar {
  height: 50px;
  padding: 0 $padding-sm;
  background-color: $white;
  position: sticky;
  top: 0;
  z-index: 200;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .wapNav {
    font-size: $font-size-lg;
  }
  .input {
    flex-grow: 1;
    padding: 0;
    margin-left: $padding-sm;
    >>> .van-search__content.van-search__content--square {
      border-radius: $border-radius-lg;
    }
  }
}
</style>
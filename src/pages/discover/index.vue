<template>
  <div class="container">
    <search></search>
    <banner :list="banners"></banner>
    <whirligig :list="recommend"></whirligig>
  </div>
</template>

<script>
import Search from "@/pages/discover/components/search";
import Banner from "@/pages/discover/components/banner";
import Whirligig from "@/pages/discover/components/whirligig";

export default {
  name: "Discover",
  components: {
    Search,
    Banner,
    Whirligig,
  },
  data: function () {
    return {
      banners: [],
      recommend: [],
    };
  },
  mounted: function () {
    const that = this;
    that.$api
      .getBanner()
      .then((res) => {
        that.banners = res.data.banners;
        return that.$api.getPersonalized();
      })
      .then((res) => {
        console.log(res.data.result);
        that.recommend = res.data.result;
      });
  },
};
</script>

<style lang="scss" scoped>
</style>
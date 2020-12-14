<template>
  <div class="container">
    <search></search>
    <banner :list="banners"></banner>
    <whirligig :list="recommend"></whirligig>
    <calendar></calendar>

    <tabbar :active="0"></tabbar>
  </div>
</template>

<script>
import Tabbar from "@/components/tabbar";
import Search from "@/pages/discover/components/search";
import Banner from "@/pages/discover/components/banner";
import Whirligig from "@/pages/discover/components/whirligig";
import Calendar from "@/pages/discover/components/calendar";

export default {
  name: "Discover",
  components: {
    Tabbar,
    Search,
    Banner,
    Whirligig,
    Calendar,
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
        that.recommend = res.data.result;
        // return that.$api.getCalendar({
        //   startTime: 1606752000000,
        //   endTime: 1609430399999,
        // });
      });
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
</style>
<template>
  <div class="container">
    <search></search>

    <div v-for="(item, index) in blocks" :key="index">
      <banner
        :ball="ball"
        :list="item.extInfo.banners"
        v-if="item.showType == 'BANNER'"
      ></banner>

      <whirligig
        :list="item.creatives"
        :uielement="item.uiElement"
        v-if="item.showType == 'HOMEPAGE_SLIDE_PLAYLIST'"
      ></whirligig>
    </div>

    <!-- <calendar></calendar> -->

    <tabbar></tabbar>
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
      // banners: [],
      // recommend: [],

      blocks: [],
      ball: [],
    };
  },
  mounted: function () {
    const that = this;
    // that.$api
    //   .getBanner()
    //   .then((res) => {
    //     that.banners = res.data.banners;
    //     return that.$api.getPersonalized();
    //   })
    //   .then((res) => {
    //     that.recommend = res.data.result;
    //     // return that.$api.getCalendar({
    //     //   startTime: 1606752000000,
    //     //   endTime: 1609430399999,
    //     // });
    //   });

    that.$api
      .getHomepageBlockPage()
      .then((res) => {
        that.blocks = res.data.data.blocks;
        return that.$api.getHomepageDragonBall();
      })
      .then((res) => {
        that.ball = res.data.data;
      });
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
</style>

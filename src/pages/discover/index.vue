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

    <transition name="children">
      <router-view></router-view>
    </transition>

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
  name: "discover",
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
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.container {
  &.children-enter,
  &.children-leave-to {
    opacity: 0;
    transform: translateY(1rem);
  }

  &.children-enter-to,
  &.children-leave {
    opacity: 1;
  }

  &.children-enter-active,
  &.children-leave-active {
    transition: 0.5s;
  }
}
</style>

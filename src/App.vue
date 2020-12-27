<template>
  <div class="app" id="app">
    <!-- <keep-alive exclude="playlist">
      <router-view />
    </keep-alive> -->
    <!-- <keep-alive>
      <router-view />
    </keep-alive> -->

    <!-- <keep-alive :exclude="keepAlives">
      <router-view :key="$router.fullPath" />
    </keep-alive> -->

    <!-- <transition name="app"> -->

    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.isKeepAlive"></router-view>

    <!-- </transition> -->

    <!-- <tabbar></tabbar> -->
  </div>
</template>

<script>
// import Tabbar from "@/components/tabbar";
export default {
  name: "App",
  // components: { Tabbar },
  // data: function () {
  //   const that = this;
  //   return {
  // keepAlives: that.$store.state.keepAlives,
  //   };
  // },
  // watch: {
  // $route: {
  //   handler: function (to, from) {
  //     const that = this;
  //     that.keepAlives = that.$store.state.keepAlives;
  //     // console.log(that.$store.state);
  //   },
  // },
  // },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
.app {
  &.app-enter,
  &.app-leave-to {
    opacity: 0;
    transform: translateY(1rem);
  }

  &.app-enter-to,
  &.app-leave {
    opacity: 1;
  }

  &.app-enter-active,
  &.app-leave-active {
    transition: 0.5s;
  }
}
</style>


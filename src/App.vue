<template>
  <div id="app">
    <!-- <keep-alive exclude="playlist">
      <router-view />
    </keep-alive> -->
    <!-- <keep-alive>
      <router-view />
    </keep-alive> -->

    <!-- <keep-alive :exclude="keepAlives">
      <router-view :key="$router.fullPath" />
    </keep-alive> -->

    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.isKeepAlive"></router-view>

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

<style scoped>
</style>

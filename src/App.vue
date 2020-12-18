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
      <router-view v-if="$route.meta.KeepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.KeepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
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
  // components: {},
};
</script>

<style scoped>
</style>

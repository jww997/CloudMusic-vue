<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.isKeepAlive"></router-view>
    <music></music>
  </div>
</template>

<script>
import Music from "@/components/music";
export default {
  name: "App",
  components: {
    Music,
  },
  mounted: function () {
    const that = this;
    let date = new Date();
    console.log(
      `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    );
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
</style>


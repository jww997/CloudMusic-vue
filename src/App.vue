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
    console.log(`欢迎来到村乐，网易云音乐的搬运工！`);
    console.log(`说明：本项目仅用于学习，无任何商业用途，也请勿用于商业！`);
    console.log(`说明：如有侵权，请联系删除！1551005987@qq.com`);
    console.log(`小程序版 https://github.com/jww997/CloudMusic-wx`);
    console.log(`VUE版 https://github.com/jww997/CloudMusic-vue`);
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


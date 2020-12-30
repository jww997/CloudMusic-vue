<template>
  <van-tabbar v-model="active" active-color="#EC4141" :border="false">
    <van-tabbar-item v-for="(item, index) in list" :key="index" :to="item.to">
      <span>{{ item.name }}</span>
      <template #icon="">
        <span class="iconfont" v-html="item.icon"></span>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: "tabbar",
  data: function () {
    return {
      active: 0,
      list: [
        {
          name: "发现",
          icon: "&#xe62c;",
          to: "/",
        },
        {
          name: "播客",
          icon: "&#xe945;",
          to: "/",
        },
        {
          name: "我的",
          icon: "&#xe687;",
          to: "/mine",
        },
        {
          name: "K歌",
          icon: "&#xe612;",
          to: "/",
        },
        {
          name: "云村",
          icon: "&#xe66f;",
          to: "/",
        },
      ],
    };
  },
  watch: {
    // $route: {
    //   handler: function (to, from) {
    //     const that = this;
    //     console.log(from);
    //     // that.keepAlives = that.$store.state.keepAlives;
    //     // console.log(that.$store.state);
    //   },
    // },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
</style>

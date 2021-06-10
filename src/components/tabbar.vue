<template>
  <div class="tabbar">
    <van-tabbar
      v-model="selectedIndex"
      active-color="#EC4141"
      :border="false"
      :fixed="false"
      safe-area-inset-bottom
      route
    >
      <van-tabbar-item
        v-for="(item, index) in list"
        :key="index"
        :to="item.to"
        replace
      >
        <template #icon="">
          <span
            :class="{ iconfont: true, ball: selectedIndex == index }"
            v-html="item.icon"
          ></span>
        </template>
        <span>{{ item.name }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  data: function () {
    return {
      selectedIndex: 0,
      list: [
        {
          name: "发现",
          icon: "&#xe62c;",
          to: "/",
        },
        // {
        //   name: "播客",
        //   icon: "&#xe945;",
        //   to: "/",
        // },
        {
          name: "我的",
          icon: "&#xe687;",
          to: "/mine",
        },
        // {
        //   name: "K歌",
        //   icon: "&#xe612;",
        //   to: "/",
        // },
        // {
        //   name: "云村",
        //   icon: "&#xe66f;",
        //   to: "/",
        // },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.tabbar {
  width: 100vw;
  background-color: $white;
  transition: $animation-duration-base;
  z-index: 100;
}
</style>

<template>
  <!-- 发现 -->
  <div class="discover">
    <discover-banner :banners="discover.banners" />
    <discover-menus :menus="discover.menus" />
    <discover-recommends :recommends="discover.recommends" />
  </div>
</template>

<script>
import DiscoverBanner from "./components/banner"; // 轮播图
import DiscoverMenus from "./components/menus"; // 菜单
import DiscoverRecommends from "./components/recommends"; // 热门推荐

export default {
  name: "discover",
  props: {
    discover: {
      type: Object,
      value: {}
    }
  },
  components: {
    DiscoverBanner,
    DiscoverMenus,
    DiscoverRecommends
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.discover {
  height: 100%;
}
</style>
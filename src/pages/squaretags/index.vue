<template>
  <div class="squaretags">
    <!-- 顶部导航栏 -->
    <navbar class="navbar" title="歌单标签" />
    歌单标签
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
export default {
  name: "squaretags",
  components: {
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.squaretags {
  .navbar {
    background-color: $white;
    color: $text-color;
  }
}
</style>
<template>
  <div class="container">
    <navbar :title="'每日推荐'" fixed backgroundColor="#EC4141"></navbar>

    <cap></cap>
    <list :list="dailySongs" sorttype="2"></list>
  </div>
</template>

<script>
import List from "@/common/list";

import Navbar from "@/common/navbar";
import Cap from "./components/cap";

export default {
  name: "dailyspecial",
  components: {
    Navbar,
    List,
    Cap,
  },
  data() {
    return {
      recommend: [],
      dailySongs: [],
    };
  },
  mounted: function () {
    const that = this;

    // that.$api.getRecommendResource().then((res) => {
    //   console.log(res);

    //   that.recommend = res.data.recommend;
    // });
    that.$api.getRecommendSongs().then((res) => {
      that.dailySongs = res.data.data.dailySongs;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.container {
  @include suspension;
  padding-bottom: $safeDistance;
  box-sizing: border-box;
}
</style>
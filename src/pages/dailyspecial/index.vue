<template>
  <div class="dailspecial">
    <navbar :title="'每日推荐'" fixed backgroundColor="#EC4141"></navbar>

    <cap></cap>
    <list :list="dailySongs" sorttype="2" allTop="1.5rem"></list>
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
    that.$api
      .getRecommendSongs()
      .then((res) => {
        that.dailySongs = res.data.data.dailySongs;
      })
      .catch((err) => {
        that.$vant.Toast.fail({
          message: "需要登录",
          forbidClick: true,
        });
        setTimeout(() => {
          let router = that.$router;
          window.history.length > 1 ? router.go(-1) : router.push("/");
        }, 1000);
      });
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.dailspecial {
  @include suspension;
  padding-bottom: $safeDistance;
  box-sizing: border-box;
}
</style>
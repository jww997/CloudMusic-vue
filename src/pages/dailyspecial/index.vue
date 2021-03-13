<template>
  <div class="dailspecial">
    <navbar :title="'每日推荐'" fixed backgroundColor="#EC4141"></navbar>

    <cap></cap>
    <list :list="dailySongs" sorttype="2" allTop="1.5rem"></list>

    <height-clear v-if="music.isPlaying" />
    <bottombar></bottombar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import heightClear from "@/base/height-clear";

import List from "@/common/list";
import Bottombar from "@/common/bottombar";
import Navbar from "@/common/navbar";
import Cap from "./components/cap";

export default {
  name: "dailyspecial",
  components: {
    heightClear,

    Navbar,
    Bottombar,
    List,
    Cap,
  },
  data() {
    return {
      recommend: [],
      dailySongs: [],
    };
  },
  computed: {
    ...mapGetters(["music"]),
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
  z-index: $zIndex-M;
}
</style>
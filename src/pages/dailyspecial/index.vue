<template>
  <div class="dailspecial">
    <navbar :title="'每日推荐'" fixed backgroundColor="#EC4141"></navbar>

    <cap></cap>
    <list :list="dailySongs" sorttype="2" allTop="1.5rem"></list>

    <placeholder />
    
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Placeholder from "@/components/placeholder";

import List from "@/common/list";
import Bottombar from "@/common/bottombar";
import Navbar from "@/common/navbar";
import Cap from "./components/cap";

export default {
  name: "dailyspecial",
  components: {
    Placeholder,

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
  mounted () {
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
</style>
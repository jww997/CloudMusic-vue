<template>
  <!-- <scroll :data="[comments]" :refreshDelay="1000"> -->
  <div class="comment">
    <navbar
      :title="`评论(${comments.length})`"
      fixed
      black
      backgroundColor="#fff"
    ></navbar>

    <list :comments="comments"></list>

    <bottombar></bottombar>
  </div>
  <!-- </scroll> -->
</template>

<script>
import Scroll from "@/base/scroll";

import Bottombar from "@/common/bottombar";

import Navbar from "@/common/navbar";
import List from "./components/list";
export default {
  name: "comment",
  components: {
    Scroll,
    Bottombar,

    Navbar,
    List,
  },
  data: function () {
    return {
      comments: [],
    };
  },
  methods: {
    getdata() {
      const that = this;
      let id = that.$route.params.id;
      if (!id) return false;
      console.log(`id = ${id}`);
      that.$api.getCommentPlaylist({ id }).then((res) => {
        that.comments = res.data.comments;
      });
    },
  },
  mounted: function () {
    const that = this;
    that.getdata();
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.comment {
  @include suspension;
  padding: $safeDistance 0;
  z-index: $zIndex-M;
}
</style>
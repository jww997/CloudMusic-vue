<template>
  <!-- <scroll :data="[comments]" :refreshDelay="1000"> -->
  <div class="comment">
    <height-clear />
    <navbar
      :title="`评论(${comments.length})`"
      fixed
      black
      backgroundColor="#fff"
    ></navbar>
    <list :comments="comments"></list>

    <height-clear />
    
  </div>
  <!-- </scroll> -->
</template>

<script>
import heightClear from "@/base/height-clear";

import Scroll from "@/base/scroll";
import Bottombar from "@/common/bottombar";

import Navbar from "@/common/navbar";
import List from "./components/list";
import { mapGetters } from "vuex";
export default {
  name: "comment",
  components: {
    heightClear,

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
  computed: {
    ...mapGetters(["music"]),
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
</style>
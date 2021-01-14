<template>
  <div class="container">
    <navbar :title="`评论(${comments.length})`" fixed black></navbar>

    <list :comments="comments"></list>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import List from "./components/list";
export default {
  name: "comment",
  components: {
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
.container {
  @include suspension;
  box-sizing: border-box;
  padding-top: $safeDistance;
}
</style>
<template>
  <div class="comment">
    <!-- 顶部导航栏 -->
    <navbar :title="`评论(${totalCount})`" />
    <!-- 评论列表 -->
    <list :list="comments" @handleScrollBottom="handleScrollBottom" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Navbar from "@/components/navbar";
import List from "./list";

export default {
  name: "comment",
  components: {
    Navbar,
    List,
  },
  data() {
    return {
      comments: [],
      totalCount: 0,
      hasMore: false, // 是否还有更多
      pageNo: 1,
    };
  },
  computed: {
    ...mapGetters(["music"]),
  },
  methods: {
    getdata() {
      const that = this;
      let { id, type } = that.$route.params;
      // type 0:歌曲 1:mv 2:歌单 3:专辑 4:电台 5:视频 6:动态
      if (that.comments.length >= that.totalCount && !id) return false;
      that.$api.getCommentNew({ id, type, pageNo: that.pageNo }).then((res) => {
        const { comments, totalCount, hasMore } = res.data.data;
        that.pageNo == 1
          ? (that.comments = comments)
          : that.comments.push(...comments);
        that.totalCount = totalCount;
        that.hasMore = hasMore;
      });
    },
    handleScrollBottom() {
      if (this.totalCount > this.comments.length) {
        this.pageNo++;
        this.getdata();
      }
    },
  },
  mounted() {
    const that = this;
    that.getdata();
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.comment {
  .navbar {
    background-color: $white;
    color: $text-color;
  }
}
</style>
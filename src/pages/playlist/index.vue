<template>
  <div class="playlist" ref="playlist">
    <!-- 歌单基本信息 -->
    <detail
      :playlist="playlist"
      :pill="pill"
      @handleHeaderClick="handleHeaderClick"
      @handleCommentClick="handleCommentClick"
    />
    <!-- 歌单基本信息全屏 -->
    <transition name="fade">
      <fullscreen
        :playlist="playlist"
        v-if="isShowFullscreen"
        @close="handleHeaderClick"
      />
    </transition>
    <!-- 播放全部 -->
    <playall :list="playlist.tracks" allTop="1.5rem" />
    <!-- 播放全部 -->
    <songs :list="playlist.tracks" allTop="1.5rem" />
    <!-- 收藏该歌单的用户 -->
    <subscribers :list="playlist.subscribers" />
    <placeholder />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { formatUnit } from "@/assets/js/filter.js";
import { toPages } from "@/assets/js/util.js";
import Placeholder from "@/components/placeholder";
import Navbar from "@/components/navbar";
import Detail from "./detail";
import Playall from "./playall";
import Songs from "./songs";
import Subscribers from "./subscribers";
import Fullscreen from "./fullscreen";

export default {
  name: "playlist",
  components: {
    Placeholder,
    Navbar,
    Detail,
    Playall,
    Songs,
    Subscribers,
    Fullscreen,
  },
  data() {
    return {
      isShowFullscreen: false,

      playlist: {},
      count: 0,
      data: [],

      isTop: true,

      pill: [
        {
          id: 1,
          name: "收藏",
          icon: "&#xe61d;",
          handleFn: "handleCollectClick",
        },
        {
          id: 2,
          name: "评论",
          icon: "&#xe65d;",
          handleFn: "handleCommentClick",
        },
        { id: 3, name: "分享", icon: "&#xe65c;", handleFn: "handleShareClick" },
      ],
    };
  },
  computed: {
    ...mapGetters(["music", "transition"]),
  },
  watch: {
    $route(to, from) {
      if (to.name == "playlist") {
        console.log(to.name);
        this.getdata();
      }
    },
  },
  methods: {
    handleHeaderClick() {
      const that = this;
      that.isShowFullscreen = !that.isShowFullscreen;
    },

    handleCommentClick(id) {
      toPages.call(this, { name: "comment", params: { id, type: 2 } });
    },
    handleScroll(event) {
      const that = this;
      let scrollTop = event.target.scrollTop;
      that.isTop = scrollTop == 0 ? true : false;
    },
    getdata() {
      const that = this;
      let id = that.$route.params.id;
      if (!id) return false;
      that.$api.getPlaylistDetail({ id }).then((res) => {
        const { playlist } = res.data;
        that.playlist = playlist;
        that.$refs.playlist.addEventListener("scroll", that.handleScroll);

        const { subscribedCount, commentCount, shareCount, id } = playlist;
        this.pill.map((item, index) => {
          item.id = id;
          switch (index) {
            case 0:
              item.count = formatUnit(subscribedCount);
              break;
            case 1:
              item.count = formatUnit(commentCount);
              break;
            case 2:
              item.count = formatUnit(shareCount);
              break;
          }
        });
      });
    },
  },
  mounted() {
    this.getdata();
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.playlist {
  background-color: $background-color-light;
}
</style>
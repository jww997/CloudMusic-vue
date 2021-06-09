<template>
  <div class="playlist" ref="playlist">
    <!-- 歌单基本信息 -->
    <detail
      :playlist="playlist"
      :pill="pill"
      @handleHeaderClick="handleHeaderClick"
    />
    <!-- 歌单基本信息全屏 -->
    <transition name="fade">
      <fullscreen :playlist="playlist" v-if="isShowFullscreen" @close="handleHeaderClick"/>
    </transition>
    <!-- 播放全部 -->
    <playall :list="playlist.tracks" allTop="1.5rem" />
    <!-- 播放全部 -->
    <songs :list="playlist.tracks" allTop="1.5rem" />
    <!-- 收藏该歌单的用户 -->
    <subscribers :list="playlist.subscribers" />
    <height-clear />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Navbar from "./components/navbar.vue";
import Detail from "./detail.vue";
import Playall from "./playall.vue";
import Songs from "./songs.vue";
import Subscribers from "./subscribers.vue";
import Fullscreen from "./fullscreen.vue";

import { formatUnit } from "@/assets/js/filter.js";
import heightClear from "@/base/height-clear";
import List from "@/common/list";
import Scroll from "@/base/scroll";
import Bottombar from "@/common/bottombar";

export default {
  name: "playlist",
  components: {
    Navbar,
    Detail,
    Playall,
    Songs,
    Subscribers,
    Fullscreen,

    heightClear,
    List,
    Scroll,
    Bottombar,
  },
  data() {
    return {
      isShowFullscreen: false,

      playlist: {},
      count: 0,
      data: [],

      isTop: true,

      pill: [
        { id: 1, name: "收藏", icon: "&#xe61d;" },
        { id: 2, name: "评论", icon: "&#xe65d;" },
        { id: 3, name: "分享", icon: "&#xe65c;" },
      ],
    };
  },
  computed: {
    ...mapGetters(["music", "transition"]),
  },
  methods: {
    handleHeaderClick: function () {
      const that = this;
      that.isShowFullscreen = !that.isShowFullscreen;
    },
    handleScroll: function (event) {
      const that = this;
      let scrollTop = event.target.scrollTop;
      that.isTop = scrollTop == 0 ? true : false;
    },
    getdata: function () {
      const that = this;
      let id = that.$route.params.id;
      if (!id) return false;
      console.log(`id = ${id}`);
      that.$api.getPlaylistDetail({ id }).then((res) => {
        const { playlist } = res.data;
        that.playlist = playlist;
        that.$refs.playlist.addEventListener("scroll", that.handleScroll);

        const { subscribedCount, commentCount, shareCount } = playlist;
        this.pill.map((item, index) => {
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
  created() {
    const that = this;
    that.getdata();
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
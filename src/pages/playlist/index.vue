<template>
  <div class="playlist" ref="playlist">
    <!-- <navbar
      :title="'歌单'"
      fixed
      :black="!isTop"
      :backgroundColor="!isTop ? '#fff' : ''"
    /> -->
    <!-- <div @click="toggleCapplus"> -->

    <detail :playlist="playlist" :pill="pill"></detail>
    <!-- </div>
    <div @click="toggleCapplus" v-if="isShowCapplus">
      <capplus :obj="playlist"></capplus>
    </div> -->

    <list :list="playlist.tracks" allTop="1.5rem"></list>
    <subscribers :list="playlist.subscribers"></subscribers>

    <height-clear />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Navbar from "./components/navbar.vue";
import Detail from "./detail.vue";

import heightClear from "@/base/height-clear";
import List from "@/common/list";
import Scroll from "@/base/scroll";
import Capplus from "@/pages/playlist/cappuls.vue";
import Subscribers from "@/pages/playlist/subscribers.vue";

import Bottombar from "@/common/bottombar";
// import List from "@/pages/playlist/components/list";
export default {
  name: "playlist",
  components: {
    Navbar,
    Detail,

    heightClear,
    List,
    Scroll,
    Capplus,
    Subscribers,
    Bottombar,
  },
  data() {
    return {
      isShowCapplus: false,
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
    toggleCapplus: function () {
      const that = this;
      that.isShowCapplus = !that.isShowCapplus;
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
              item.count = subscribedCount;
              break;
            case 1:
              item.count = commentCount;
              break;
            case 2:
              item.count = shareCount;
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
</style>
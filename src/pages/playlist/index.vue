<template>
  <!-- <scroll :data="[playlist]" :refreshDelay="1000"> -->
  <div class="playlist" ref="playlist">
    <navbar
      :title="'歌单'"
      fixed
      :black="!isTop"
      :backgroundColor="!isTop ? '#fff' : ''"
    ></navbar>
    <div @click="toggleCapplus">
      <cap :obj="playlist"></cap>
    </div>
    <!-- <list :obj="playlist"></list> -->
    <list :list="playlist.tracks" allTop="1.5rem"></list>
    <subscribers :list="playlist.subscribers"></subscribers>

    <div @click="toggleCapplus" v-if="isShowCapplus">
      <capplus :obj="playlist"></capplus>
    </div>

    <bottombar></bottombar>

    <transition :name="transition">
      <router-view></router-view>
    </transition>
  </div>
  <!-- </scroll> -->
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import List from "@/common/list";

import Scroll from "@/base/scroll";
import Navbar from "@/common/navbar";
import Cap from "@/pages/playlist/components/cap";
import Capplus from "@/pages/playlist/components/cappuls";
import Subscribers from "@/pages/playlist/components/subscribers";

import Bottombar from "@/common/bottombar";
// import List from "@/pages/playlist/components/list";
export default {
  name: "playlist",
  components: {
    List,

    Scroll,

    Navbar,
    Cap,
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
      // busy: false,

      isTop: true,
    };
  },
  computed: {
    ...mapGetters(["transition"]),
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
        that.playlist = res.data.playlist;
        that.$refs.playlist.addEventListener("scroll", that.handleScroll);
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
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.playlist {
  @include suspension;
  padding-bottom: $safeDistance;
  z-index: $zIndex-S;
}
</style>
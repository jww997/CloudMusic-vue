<template>
  <!-- <transition name="fade" :duration="1000"> -->
  <!-- <div
      class="container"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
    > -->
  <!-- <div v-for="item in data" :key="item.index">{{ item.name }}</div> -->
  <div class="container">
    <navbar :title="'歌单'" fixed></navbar>
    <cap :obj="playlist"></cap>
    <list :obj="playlist"></list>

    <!-- <transition name="children">
      <router-view></router-view>
    </transition> -->
  </div>

  <!-- </div> -->
  <!-- </transition> -->
</template>

<script>
import BetterScroll from "better-scroll";
import Navbar from "@/components/navbar";
import Cap from "@/pages/playlist/components/cap";
import List from "@/pages/playlist/components/list";
export default {
  name: "playlist",
  components: {
    Navbar,
    Cap,
    List,
  },
  data() {
    return {
      playlist: {},
      count: 0,
      data: [],
      busy: false,
    };
  },
  methods: {
    loadMore: function () {
      this.busy = true;
      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i++) {
          this.data.push({ name: this.count++ });
        }
        console.log(this.data);
        this.busy = false;
      }, 1000);
    },
    getdata: function () {
      const that = this;

      let id = that.$route.params.id;
      that.$api.getPlaylistDetail({ id }).then((res) => {
        that.playlist = res.data.playlist;

        // that.$set(that, "playlist", res.data.playlist);
        // that.$set(that, "playlist", {});
        // that.playlist = [];
        // console.log(res.data.playlist);

        // res.data.playlist.forEach(item => {
        //   that.playlist.push(item);
        // });
      });
    },
  },
  created() {
    const that = this;
    // console.log(that.$route);
    console.log(that.$route.params.id);
    // that.timestamp = Date.parse(new Date());
    that.getdata();
    // if (that.$route.query) {
    // that.id = that.$route.params.id;
    // }
  },
  mounted() {
    const that = this;
    console.log(that.$refs.playlist);

    // let bs = new BetterScroll(that.$refs.playlist, {
    //   movable: true,
    //   zoom: true,
    // });
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
.container {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  @include positionCenter;
  position: fixed;
  overflow: auto;
  z-index: 100;

  // &.children-enter,
  // &.children-leave-to {
  //   opacity: 0;
  //   transform: translateY(1rem);
  // }

  // &.children-enter-to,
  // &.children-leave {
  //   opacity: 1;
  // }

  // &.children-enter-active,
  // &.children-leave-active {
  //   transition: 0.5s;
  // }
}
</style>
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
    <div @click="toggleCapplus">
      <cap :obj="playlist"></cap>
    </div>
    <list :obj="playlist"></list>
    <div @click="toggleCapplus" v-if="isShowCapplus">
      <capplus :obj="playlist"></capplus>
    </div>
  </div>
</template>

<script>
import BetterScroll from "better-scroll";
import Navbar from "@/components/navbar";
import Cap from "@/pages/playlist/components/cap";
import Capplus from "@/pages/playlist/components/cappuls";
import List from "@/pages/playlist/components/list";
export default {
  name: "playlist",
  components: {
    Navbar,
    Cap,
    Capplus,
    List,
  },
  data() {
    return {
      isShowCapplus: false,
      playlist: {},
      count: 0,
      data: [],
      // busy: false,
    };
  },
  methods: {
    toggleCapplus: function () {
      const that = this;
      that.isShowCapplus = !that.isShowCapplus;
    },
    getdata: function () {
      const that = this;
      let id = that.$route.params.id;
      if (!id) return false;
      console.log(`id = ${id}`);
      that.$api.getPlaylistDetail({ id }).then((res) => {
        that.playlist = res.data.playlist;
      });
    },
    //loadMore: function () {
    //   this.busy = true;
    //   setTimeout(() => {
    //     for (var i = 0, j = 10; i < j; i++) {
    //       this.data.push({ name: this.count++ });
    //     }
    //     console.log(this.data);
    //     this.busy = false;
    //   }, 1000);
    // },
  },
  created() {
    const that = this;
    that.getdata();
  },
  // mounted() {
  //   const that = this;
  // console.log(that.$refs.playlist);
  // let bs = new BetterScroll(that.$refs.playlist, {
  //   movable: true,
  //   zoom: true,
  // });
  // },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
// .container {
// @include suspension;
// padding-bottom: $safeDistance;
// .capplus {
//   transition: 0.5s;
//   &.hide {
//     opacity: 0;
//   }
// }

// @include positionCenter;
// position: fixed;
// overflow: auto;

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
// }
</style>
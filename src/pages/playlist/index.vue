<template>
  <div class="container">
    <navbar :title="'歌单'"></navbar>
    <cap :obj="playlist"></cap>
    <list :obj="playlist"></list>
  </div>
</template>

<script>
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
    };
  },
  methods: {
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
    console.log(that.$route);
    console.log(that.$route.params.id);
    // that.timestamp = Date.parse(new Date());
    that.getdata();
    // if (that.$route.query) {
    // that.id = that.$route.params.id;
    // }
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
</style>
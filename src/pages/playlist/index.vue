<template>
  <div class="container" v-if="playlist">
    <cap :obj="playlist"></cap>
    <list :obj="playlist"></list>
  </div>
</template>

<script>
import Cap from "@/pages/playlist/components/cap";
import List from "@/pages/playlist/components/list";
export default {
  name: "Playlist",
  components: {
    Cap,
    List,
  },
  data: function () {
    return {
      playlist: {},
    };
  },
  created: function () {
    const that = this;
    let id = that.$route.query.id;
    that.$api.getPlaylistDetail({ id }).then((res) => {
      console.log(id);
      that.playlist = res.data.playlist;
    });
  },

  beforeRouteLeave(to, from, next) {
    const that = this;
    if (to.name !== "Playlist") {
      that.$store.commit("keepAlivesDel", "Discover");
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
</style>
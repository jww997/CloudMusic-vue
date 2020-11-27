<template>
  <div class="container">
    <heade :obj="playlist"></heade>
  </div>
</template>

<script>
import Heade from "@/pages/playlist/components/header";

export default {
  name: "playlist",
  components: {
    Heade,
  },
  data: function () {
    return {
      playlist: {},
    };
  },
  mounted: function () {
    const that = this;
    let id = that.$route.query.id;
    that.$api.getPlaylistDetail({ id }).then((res) => {
      console.log(res.data.playlist);
      that.playlist = res.data.playlist;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
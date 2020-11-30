<template>
  <div class="container">
    <cap :obj="playlist"></cap>
  </div>
</template>

<script>
import Cap from "@/pages/playlist/components/cap";
export default {
  name: "playlist",
  components: {
    Cap,
  },
  data: function () {
    return {
      playlist: {},
    };
  },
  beforeCreate: function () {
    const that = this;
    console.log("已创建");
    let id = that.$route.query.id;
    that.$api.getPlaylistDetail({ id }).then((res) => {
      that.playlist = res.data.playlist;
    });
  },
  destroyed: function () {
    console.log("已销毁");
  },
};
</script>

<style lang="scss" scoped>
</style>
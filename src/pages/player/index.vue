<template>
  <div class="container">
    <phonograph :obj="songs[0]"></phonograph>
    <handle></handle>
  </div>
</template>

<script>
import Phonograph from "./components/phonograph";
import Handle from "./components/handle";
export default {
  name: "player",
  components: {
    Phonograph,
    Handle,
  },
  data: function () {
    return {
      songs: [],
    };
  },
  created: function () {
    const that = this;
    let id = that.$route.query.id;
    console.log(id);
    that.$api.getSongDetail({ ids: id }).then((res) => {
      console.log(res);
      that.songs = res.data.songs;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
.container {
  // height: 100vh;
  background: #000;
}
</style>
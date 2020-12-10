<template>
  <div class="container">
    <phonograph :obj="songs[0]"></phonograph>
  </div>
</template>

<script>
import Phonograph from "./components/phonograph";
export default {
  name: "player",
  components: {
    Phonograph,
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
}
</style>
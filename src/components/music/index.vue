<template>
  <div class="kid">
    <audio :src="playUrl" autoplay></audio>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "music",
  data: function () {
    return {
      playUrl:
        "http://m801.music.126.net/20201230171126/d37ae51ef9c407e562a39b935ec271d1/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/5257094924/a140/bc04/5af7/93293d890b670d4ed8b1012c045dafea.mp3",
    };
  },
  // computed: {
  //   ...mapState["playUrl"],
  // },
  // watch: {
  //   playUrl: function () {
  //     const that = this;
  //     console.log(111111111111);
  //     console.log(that.playUrl);
  //   },
  // },
  mounted: function () {
    const that = this;
    console.log(that.playUrl);
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
</style>
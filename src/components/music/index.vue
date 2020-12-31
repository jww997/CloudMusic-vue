<template>
  <div class="kid">
    <audio
      ref="audio"
      :src="playUrl"
      @ended="ended"
      @canplay="canplay"
      @timeupdate="timeupdate"
    ></audio>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "music",
  computed: {
    ...mapGetters([
      "playUrl",
      "playState",
      "playIndex",
      "playlist",

      "currentTime",
      "duration",
    ]),
  },
  watch: {
    playState: function (val) {
      const that = this;
      let audio = that.$refs.audio;
      val ? audio.play() : audio.pause();
    },
    playIndex: function (val) {
      const that = this;
      try {
        that.$api
          .getSongUrl({
            id: that.playlist[that.playIndex].id,
          })
          .then((res) => {
            let url = res.data.data[0].url;
            that.setPlayUrl(url);
          });
      } catch (error) {
        console.log("你该充钱了");
        console.log(error);
      }
    },
    playUrl: function (val) {
      const that = this;
      let audio = that.$refs.audio;
      console.log(`源 => ${val}`);
      // val && audio.play();

      // that.$api
      //   .getSongDetail({ ids: that.playlist[that.playIndex].id })
      //   .then((res) => {
      //     that.songs = res.data.songs;
      //   });
    },
  },
  methods: {
    canplay: function (event) {
      console.log("开始 你的表演 ---------------------------------");
      const that = this;
      let audio = that.$refs.audio;
      that.setPlayState(true);
      audio.play();
    },
    ended: function () {
      console.log("结束 你的表演 ---------------------------------");
      const that = this;
      let audio = that.$refs.audio;
      that.setPlayState(false);
      audio.pause();

      console.log("继续 你的表演 ---------------------------------");
      let index = that.playIndex + 1;
      index <= that.playlist.length ? that.setPlayIndex(index) : "";
      that.setCurrentSong(that.playlist[index]);
    },
    timeupdate: function () {
      const that = this;
      let audio = that.$refs.audio;
      that.currentTime != audio.currentTime &&
        that.setCurrentTime(audio.currentTime);
      that.duration != audio.duration && that.setDuration(audio.duration);
    },
    ...mapMutations({
      setPlayUrl: "SET_PLAY_URL",
      setPlayState: "SET_PLAY_STATE",
      setPlayIndex: "SET_PLAY_INDEX",

      setCurrentSong: "SET_CURRENTSONG",
      setCurrentTime: "SET_CURRENTTIME",
      setDuration: "SET_DURATION",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
</style>
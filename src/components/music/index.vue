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
import { Notify } from "vant";
export default {
  name: "music",
  computed: {
    ...mapGetters([
      "playUrl",
      "playState",
      "playIndex",
      "playlist",
      "playSequence",
      "playMode",

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
        let song = that.playlist[that.playIndex];
        that.setCurrentSong(song);
        that.$api
          .getSongUrl({
            id: song.id,
          })
          .then((res) => {
            let url = res.data.data[0].url;
            url == null ? that._next() : that.setPlayUrl(url);
          });
      } catch (error) {
        console.log("你该充钱了");
        console.log(error);
        that._next();
      }
    },
    playUrl: function (val) {
      const that = this;
      console.log(`源 => ${val}`);
    },
    playSequence: function (val) {
      const that = this;
      let text = that.playMode[val].text;
      console.log(`模式 => ${text}`);
      Notify({ type: "primary", duration: 500, message: text });
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
      that._next();
    },
    timeupdate: function () {
      const that = this;
      if (!that.playState) return false;
      let audio = that.$refs.audio;
      that.currentTime != audio.currentTime &&
        that.setCurrentTime(audio.currentTime);
      that.duration != audio.duration && that.setDuration(audio.duration);
    },
    _next: function () {
      const that = this;
      let index = that.playIndex + 1;
      index <= that.playlist.length ? that.setPlayIndex(index) : "";
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
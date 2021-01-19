<template>
  <div class="kid">
    <audio
      ref="audio"
      :src="playUrl"
      v-if="playUrl"
      @ended="ended"
      @error="error"
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
      "playId",
      "playlist",
      "playSequence",
      "playMode",
      "playDrag",
      "playVolume",

      "currentSong",
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
    playUrl: function (val) {
      const that = this;
      console.log(`源 => ${val}`);
    },
    playSequence: function (val) {
      const that = this;
      let text = that.playMode[val].text;
      console.log(`模式 => ${text}`);
      that.$vant.Toast({ type: "html", duration: 500, message: text });
    },
    playVolume: function (val) {
      const that = this;
      let audio = that.$refs.audio;
      console.log(`当前音量 => ${val}`);
      let volume = (audio.volume = val / 100);
      val ? (audio.volume = volume) : "";
    },

    playId: function (val) {
      const that = this;
      that.getdata();
    },
    playIndex: function (val) {
      const that = this;
      let current = that.playlist[val];
      that.setPlayId(current.id);
      that.setCurrentSong(current);
    },
    playDrag: function (val) {
      const that = this;
      if (val) {
        let audio = that.$refs.audio;
        audio.currentTime = that.currentTime;
        that.setPlayDrag(false);
      }
    },
  },
  methods: {
    canplay: function () {
      console.log("开始 你的表演 ---------------------------------");
      const that = this;
      let audio = that.$refs.audio;
      that.setPlayState(true);
      audio.play();

      that.setPlayVolume(audio.volume * 100);
    },
    ended: function () {
      console.log("结束 你的表演 ---------------------------------");
      const that = this;
      let audio = that.$refs.audio;
      that.setPlayState(false);
      audio.pause();
      that.next();
    },
    timeupdate: function () {
      const that = this;
      if (!that.playState || that.playDrag) return false;
      let audio = that.$refs.audio;
      that.currentTime != audio.currentTime &&
        that.setCurrentTime(audio.currentTime);
      that.duration != audio.duration && that.setDuration(audio.duration);
    },
    error: function () {
      console.log("翻车啦  --------------------------------------");
      const that = this;
    },
    getdata: function () {
      const that = this;
      try {
        that.$api.getSongUrl({ id: that.playId }).then((res) => {
          let url = res.data.data[0].url;
          if (!url) {
            let duration = 3000;
            that.$vant.Toast({
              duration,
              message: "没有版权 / VIP专享",
            });
            setTimeout(() => {
              that.next();
            }, duration);
          } else {
            that.setPlayUrl(url);
          }
        });
      } catch (error) {}
    },
    next: function () {
      console.log("继续 你的表演 ---------------------------------");
      const that = this;
      let playIndex = that.playIndex;
      let length = that.playlist.length;
      let audio = that.$refs.audio;
      switch (that.playSequence) {
        case 0: // 顺序循环
          if (playIndex == length - 1) {
            playIndex = 0;
          } else if (playIndex + 1 <= length) {
            playIndex = playIndex + 1;
          }
          that.setPlayIndex(playIndex);
          break;
        case 1: // 随机播放
          let random = Math.random();
          that.setPlayIndex(Math.round(length * random));
          break;
        case 2: // 单曲循环
          audio.load();
          break;
      }
    },
    ...mapMutations({
      setPlayUrl: "SET_PLAY_URL",
      setPlayState: "SET_PLAY_STATE",
      setPlayIndex: "SET_PLAY_INDEX",
      setPlayId: "SET_PLAY_ID",
      setPlayDrag: "SET_PLAY_DRAG",
      setPlayVolume: "SET_PLAY_VOLUME",

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
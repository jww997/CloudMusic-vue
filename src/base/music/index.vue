<template>
  <div class="base">
    <audio
      ref="audio"
      :src="music.url"
      v-if="music.url"
      @canplay="canplay"
      @ended="ended"
      @error="error"
      @timeupdate="timeupdate"
    ></audio>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "music",
  computed: {
    isPlaying() {
      const that = this;
      return that.music.isPlaying;
    },
    id() {
      const that = this;
      return that.music.id;
    },
    currentIndex() {
      const that = this;
      return that.music.currentIndex;
    },
    volume() {
      const that = this;
      return that.music.volume;
    },
    ...mapGetters([
      // "playUrl",
      // "playState",
      // "playIndex",
      // "playId",
      // "playlist",
      "playSequence",
      "playMode",
      "playDrag",
      // "playVolume",

      // "currentSong",
      // "currentTime",
      // "duration",

      "music",
    ]),
  },
  watch: {
    isPlaying(val, oldval) {
      const that = this;
      let audio = that.$refs.audio;
      if (!audio) return false;
      val ? audio.play() : audio.pause();
    },
    id(val, oldval) {
      const that = this;
      that.getMusic(val);
    },
    currentIndex(val, oldval) {
      const that = this;
      let current = that.music.currentList[val];
      that.amendStateObjValue({ key: "current", value: current });
      that.amendStateObjValue({ key: "id", value: current.id });
    },
    volume(val, oldval) {
      const that = this;
      let audio = that.$refs.audio;
      console.log(`当前音量 => ${val}`);
      that.amendStateObjValue({ key: "volume", value: val });
      audio.volume = val / 100;
    },

    music: {
      handler(val, oldval) {
        const that = this;

        if (val.modeIndex != oldval.modeIndex) {
          let text = val.modeList[val.modeIndex].text;
          console.log(`模式 => ${text}`);
          that.$vant.Toast({ type: "html", duration: 500, message: text });
        }
      },
      deep: true,
    },

    // playSequence: function (val) {
    //   const that = this;
    //   let text = that.playMode[val].text;
    //   console.log(`模式 => ${text}`);
    //   that.$vant.Toast({ type: "html", duration: 500, message: text });
    // },

    // playIndex: function (val) {
    //   const that = this;
    //   let current = that.playlist[val];
    //   that.setPlayId(current.id);
    //   that.setCurrentSong(current);
    // },
    playDrag: function (val) {
      const that = this;
      if (val) {
        let audio = that.$refs.audio;
        audio.currentTime = that.music.currentTime;
        that.setPlayDrag(false);
      }
    },
  },
  methods: {
    canplay: function () {
      console.log("开始 你的表演 ---------------------------------");
      const that = this;
      let audio = that.$refs.audio;
      let music = that.music;
      music.isPlaying = true;
      music.volume = audio.volume * 100;
      that.setMusic(music);
      audio.play();
    },
    ended: function () {
      console.log("结束 你的表演 ---------------------------------");
      const that = this;
      let audio = that.$refs.audio;
      let music = that.music;
      music.isPlaying = false;
      that.setMusic(music);
      audio.pause();
      that.next();
    },
    timeupdate: function () {
      const that = this;
      let music = that.music;
      // if (!music.isPlaying || music.isDraging) return false;
      let audio = that.$refs.audio;
      music.currentTime != audio.currentTime &&
        (music.currentTime = audio.currentTime);
      music.duration != audio.duration && (music.duration = audio.duration);
      that.setMusic(music);
    },
    error: function () {
      console.log("翻车啦  --------------------------------------");
      const that = this;
    },
    next: function () {
      console.log("继续 你的表演 ---------------------------------");
      const that = this;
      let music = that.music;
      let currentIndex = music.currentIndex;
      let length = that.playlist.length;
      let audio = that.$refs.audio;
      switch (that.playSequence) {
        case 0: // 顺序循环
          if (currentIndex <= length - 1) {
            currentIndex = currentIndex + 1;
            music.currentIndex = currentIndex;
            that.setMusic(music);
          }
          break;
        case 1: // 随机播放
          let random = Math.random();
          music.currentIndex = Math.round(length * random);
          that.setMusic(music);
          break;
        case 2: // 单曲循环
          audio.load();
          break;
      }
    },
    ...mapMutations({
      setPlayDrag: "SET_PLAY_DRAG",
      setPlayVolume: "SET_PLAY_VOLUME",

      setMusic: "SET_MUSIC",
    }),
    ...mapActions(["getMusic", "amendStateObjValue"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.base {
}
</style>
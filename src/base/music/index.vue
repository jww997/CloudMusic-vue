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
    ...mapGetters([
      // "playUrl",
      // "playState",
      "playIndex",
      "playId",
      "playlist",
      "playSequence",
      "playMode",
      "playDrag",
      "playVolume",

      "currentSong",
      // "currentTime",
      // "duration",

      "music",
    ]),
  },
  watch: {
    music: {
      handler(val, oldval) {
        const that = this;
        if (val.id != oldval.id) {
          console.log(`源 => ${val.url}`);
          that.getMusic(val.id);
        } else if (val.isPlaying != oldval.isPlaying) {
          let audio = that.$refs.audio;
          console.log(val.isPlaying);
          val.isPlaying ? audio.play() : audio.pause();
        }
      },
      deep: true,
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
      // that.setPlayState(true);
      audio.play();

      // that.setPlayVolume(audio.volume * 100);
    },
    ended: function () {
      console.log("结束 你的表演 ---------------------------------");
      const that = this;
      let audio = that.$refs.audio;
      let music = that.music;
      music.isPlaying = false;
      that.setMusic(music);
      // that.setPlayState(false);
      audio.pause();
      that.next();
    },
    timeupdate: function () {
      const that = this;
      let music = that.music;
      if (!music.isPlaying || music.isDraging) return false;
      let audio = that.$refs.audio;

      music.currentTime != audio.currentTime &&
        (music.currentTime = audio.currentTime);
      music.duration != audio.duration && (music.duration = audio.duration);
      that.setMusic(music);

      // that.duration != audio.duration && that.setDuration(audio.duration);
    },
    error: function () {
      console.log("翻车啦  --------------------------------------");
      const that = this;
    },
    // getdata: function () {
    //   const that = this;
    //   try {
    //     that.$api.getSongUrl({ id: that.playId }).then((res) => {
    //       let url = res.data.data[0].url;
    //       if (!url) {
    //         let duration = 3000;
    //         that.$vant.Toast({
    //           duration,
    //           message: "没有版权 / VIP专享",
    //         });
    //         setTimeout(() => {
    //           that.next();
    //         }, duration);
    //       } else {
    //         let music = that.music;
    //         music.url = url;
    //         that.setMusic(music);
    //       }
    //     });
    //   } catch (error) {}
    // },
    next: function () {
      console.log("继续 你的表演 ---------------------------------");
      const that = this;
      let music = that.music;
      let currentIndex = music.currentIndex;
      let length = that.playlist.length;
      let audio = that.$refs.audio;
      switch (that.playSequence) {
        case 0: // 顺序循环
          if (currentIndex == length - 1) {
            currentIndex = 0;
          } else if (currentIndex + 1 <= length) {
            currentIndex = currentIndex + 1;
          }
          music.currentIndex = currentIndex;
          that.setMusic(music);
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
      // setPlayState: "SET_PLAY_STATE",
      // setPlayIndex: "SET_PLAY_INDEX",
      // setPlayId: "SET_PLAY_ID",
      setPlayDrag: "SET_PLAY_DRAG",
      setPlayVolume: "SET_PLAY_VOLUME",

      setCurrentSong: "SET_CURRENTSONG",
      // setCurrentTime: "SET_CURRENTTIME",
      // setDuration: "SET_DURATION",

      setMusic: "SET_MUSIC",
    }),
    ...mapActions(["getMusic"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.base {
}
</style>
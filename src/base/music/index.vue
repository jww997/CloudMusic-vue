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
    isDraging() {
      const that = this;
      return that.music.isDraging;
    },
    id() {
      const that = this;
      return that.music.id;
    },
    currentIndex() {
      const that = this;
      return that.music.currentIndex;
    },
    modeIndex() {
      const that = this;
      return that.music.modeIndex;
    },
    volume() {
      const that = this;
      return that.music.volume;
    },
    isMvShow() {
      const that = this;
      return that.mv.isShow;
    },
    ...mapGetters(["music", "mv"]),
  },
  watch: {
    isPlaying(val, oldval) {
      const that = this;
      let audio = that.$refs.audio;
      if (!audio) return false;
      val ? audio.play() : audio.pause();
    },
    isDraging(val, oldval) {
      const that = this;
      let audio = that.$refs.audio;
      if (val) {
        audio.currentTime = that.music.currentTime;
        that.amendStateObjValue({ key: "isDraging", value: false });
      }
    },
    id(val, oldval) {
      const that = this;
      that.getMusic(val);
    },
    currentIndex(val, oldval) {
      const that = this;
      let current = that.music.currentList[val];
      if (!current) return false;
      that.amendStateObjValue({ key: "current", value: current });
      that.amendStateObjValue({ key: "id", value: current.id });
    },
    modeIndex(val, oldval) {
      const that = this;
      let text = that.music.modeList[val].text;
      console.log(`模式 => ${text}`);
      that.$vant.Toast({ type: "html", duration: 500, message: text });
    },
    volume(val, oldval) {
      const that = this;
      let audio = that.$refs.audio;
      console.log(`当前音量 => ${val}`);
      that.amendStateObjValue({ key: "volume", value: val });
      audio.volume = val / 100;
    },
    // isMvShow(val, oldVal) {
    //   const that = this;
    //   console.log(val);
    //   // if (!val) return false;
    //   that.amendStateObjValue({ key: "isPlaying", value: !val });
    // },
  },
  methods: {
    canplay: function () {
      console.log("开始 你的表演 ---------------------------------");
      const that = this;
      let audio = that.$refs.audio;
      that.amendStateObjValue({ key: "isPlaying", value: true });
      that.amendStateObjValue({ key: "volume", value: audio.volume * 100 });
      audio.play();
    },
    ended: function () {
      console.log("结束 你的表演 ---------------------------------");
      const that = this;
      that.amendStateObjValue({ key: "isPlaying", value: false });
      that.next();
    },
    timeupdate: function () {
      const that = this;
      // if (!music.isPlaying || music.isDraging) return false;
      let audio = that.$refs.audio;
      that.music.currentTime != audio.currentTime &&
        that.amendStateObjValue({
          key: "currentTime",
          value: audio.currentTime,
        });
      that.music.duration != audio.duration &&
        that.amendStateObjValue({ key: "duration", value: audio.duration });
    },
    error: function (event) {
      console.log("翻车啦  --------------------------------------", event);
      const that = this;
    },
    next: function () {
      console.log("继续 你的表演 ---------------------------------");
      const that = this;
      let music = that.music;
      let currentIndex = music.currentIndex;
      let length = music.currentList.length;
      let audio = that.$refs.audio;
      switch (music.modeIndex) {
        case 0: // 顺序循环
          if (currentIndex <= length - 1) {
            currentIndex = currentIndex + 1;
            that.amendStateObjValue({
              key: "currentIndex",
              value: currentIndex,
            });
          }
          break;
        case 1: // 随机播放
          let random = Math.random();
          that.amendStateObjValue({
            key: "currentIndex",
            value: Math.round(length * random),
          });
          break;
        case 2: // 单曲循环
          audio.load();
          break;
      }
    },
    ...mapActions(["getMusic", "amendStateObjValue"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
</style>
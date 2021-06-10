<template>
  <div class="musicvideo">
    <!-- <div
      :class="{ interaction: true, active: !mv.isPlaying }"
      @click="toggleMvPlaying"
    > -->
    <video
      class="video"
      ref="video"
      controlsList="nodownload noremote nofootbar"
      :controls="true"
      :autoplay="true"
      :loop="true"
      :poster="poster"
      :src="url"
      @timeupdate="timeupdate"
      @canplay="canplay"
    >
      视频加载失败，请更换浏览器
    </video>
    <!-- <div class="iconfont" v-if="!mv.isPlaying">&#xe615;</div> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "musicvideo",
  props: ["url", "poster"],
  computed: {
    ...mapState(["mv"]),
  },
  methods: {
    canplay() {
      const that = this;
      that.amendStateObjValue({ name: "mv", key: "isPlaying", value: true });
    },
    timeupdate() {
      const that = this;
      let video = that.$refs.video;
      if (!video) return false;
      that.amendStateObjValue({
        name: "mv",
        key: "currentTime",
        value: video.currentTime,
      });
      that.amendStateObjValue({
        name: "mv",
        key: "duration",
        value: video.duration,
      });
    },
    ...mapActions(["amendStateObjValue"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.musicvideo {
  width: 100%;
  position: relative;
  overflow: hidden;
  @include flexCenter;
  .video {
    max-width: 100%;
    max-height: 10rem;
    transition: $animation-duration-base;
    // video默认全屏按钮
    &::-webkit-media-controls-fullscreen-button {
      display: none !important;
    }
    // video默认aduio音量按钮
    &::-webkit-media-controls-mute-button {
      display: none !important;
    }
    // video默认setting按钮
    &::-internal-media-controls-overflow-button {
      display: none !important;
    }
    // 禁用video的controls（要慎重！不要轻易隐藏掉，会导致点击视频不能播放）
    &::-webkit-media-controls {
      display: none !important;
    }
  }
  .iconfont {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 2rem;
    text-shadow: 0 0 20px $theme-GRAY;
    @include positionCenter;
    @include flexCenter;
    opacity: $opacity-M;
  }
  &.active {
    background-color: $black;
    .video {
      opacity: $active-opacity;
    }
  }
  // 腾讯云点播禁用firefox全屏、设置按钮
  .trump-button[sub-component="fullscreen_btn"],
  .trump-button[now="fullscreen"] {
    display: none !important;
  }
  .trump-button[sub-component="setting"] {
    display: none !important;
  }
}
</style>
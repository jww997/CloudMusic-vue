<template>
  <div class="mv">
    <navbar :title="'视频'" :fixed="false" iconLeft="arrow-down"></navbar>
    <height-clear />
    <div
      :class="{ interaction: true, active: !mv.isPlaying }"
      @click="toggleMvPlaying"
    >
      <video
        class="video"
        ref="video"
        :src="url"
        :poster="info.cover"
        controlsList="nodownload noremote nofootbar"
        :controls="false"
        loop
        v-if="info.cover"
        @timeupdate="timeupdate"
        @canplay="canplay"
      >
        视频加载失败，请更换浏览器
      </video>
      <div class="iconfont" v-if="!mv.isPlaying">&#xe615;</div>
    </div>
    <info :info="info" :count="count"></info>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import heightClear from "@/base/height-clear";
import Navbar from "@/common/navbar";
import Info from "./components/info";
export default {
  name: "mv",
  components: {
    heightClear,
    Navbar,
    Info,
  },
  data: function () {
    return {
      isMusicPlaying: false, // 记录音乐播放状态
      url: "",
      info: {},
      count: {},
    };
  },
  computed: {
    isPlaying() {
      const that = this;
      return that.mv.isPlaying;
    },
    currentTime() {
      const that = this;
      return that.mv.currentTime;
    },
    ...mapState(["music", "mv"]),
  },
  watch: {
    isPlaying(val, oldVal) {
      const that = this;
      let video = that.$refs.video;
      if (!video) return false;
      val ? video.play() : video.pause();
    },
    currentTime(val, oldVal) {
      const that = this;
      if (!that.mv.isDraging) return false;
      let video = that.$refs.video;
      video.currentTime = val;
      that.amendStateObjValue({ name: "mv", key: "isDraging", value: false });
    },
  },
  methods: {
    canplay: function () {
      const that = this;
      that.amendStateObjValue({ name: "mv", key: "isPlaying", value: true });
    },
    timeupdate: function () {
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
    toggleMvPlaying: function () {
      const that = this;
      that.amendStateObjValue({
        name: "mv",
        key: "isPlaying",
        value: !that.mv.isPlaying,
      });
    },
    getdata: function () {
      const that = this;
      // let id = that.$route.query.id;
      let id = that.mv.id;
      console.log(`mv = ${id}`);
      that.$api
        .getMvDetail({ mvid: id })
        .then((res) => {
          that.info = res.data.data;
          return that.$api.getMvUrl({ id });
        })
        .then((res) => {
          that.url = res.data.data.url;
          return that.$api.getMvDetailInfo({ mvid: id });
        })
        .then((res) => {
          that.count = res.data;
        });
    },
    ...mapMutations({
      setMv: "SET_MV",
    }),
    ...mapActions(["amendStateObjValue"]),
  },
  mounted: function () {
    const that = this;
    if (that.music.isPlaying) {
      that.amendStateObjValue({ key: "isPlaying", value: false });
      that.isMusicPlaying = true;
    }
    that.getdata();
  },
  destroyed: function () {
    const that = this;
    if (that.isMusicPlaying) {
      that.amendStateObjValue({ key: "isPlaying", value: true });
    }
    //   that.amendStateObjValue({ name: "mv", key: "isPlaying", value: false });
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.mv {
  height: 100vh;
  @include suspension;
  background: center no-repeat $theme-BLACK;
  background-size: 0;
  overflow: hidden;
  z-index: $zIndex-XL;

  box-sizing: border-box;
  color: #fff;
  .interaction {
    max-height: 40%;
    // margin-top: 1rem;
    position: relative;
    background-color: $theme-BLACK;
    // background-color: #101010;
    transition: $time-M;
    overflow: hidden;
    display: flex;
    .video {
      width: 100%;
      min-height: 5rem;
      transition: $time-M;
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
      background-color: $theme-BLACK;
      .video {
        opacity: $opacity-S;
      }
    }
  }

  /*video默认全屏按钮*/
  video::-webkit-media-controls-fullscreen-button {
    display: none !important;
  }

  /*video默认aduio音量按钮*/
  video::-webkit-media-controls-mute-button {
    display: none !important;
  }

  /*video默认setting按钮*/
  video::-internal-media-controls-overflow-button {
    display: none !important;
  }

  /*腾讯云点播禁用firefox全屏、设置按钮*/
  .trump-button[sub-component="fullscreen_btn"],
  .trump-button[now="fullscreen"] {
    display: none !important;
  }
  .trump-button[sub-component="setting"] {
    display: none !important;
  }

  /*禁用video的controls（要慎重！不要轻易隐藏掉，会导致点击视频不能播放）*/
  video::-webkit-media-controls {
    display: none !important;
  }
}
</style>
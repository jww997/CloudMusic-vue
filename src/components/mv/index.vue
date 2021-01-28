<template>
  <div class="container">
    <navbar :title="'视频'" :fixed="false"></navbar>
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
        视频播放失败，请更换浏览器
      </video>
      <div class="iconfont" v-if="!mv.isPlaying">&#xe615;</div>
    </div>
    <info :info="info" :count="count"></info>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Navbar from "@/components/navbar";
import Info from "./components/info";
export default {
  name: "mv",
  components: {
    Navbar,
    Info,
  },
  data: function () {
    return {
      isPlaying: false, // 记录音乐播放状态
      url: "",
      info: {},
      count: {},
    };
  },
  computed: {
    ...mapState(["playState", "mv"]),
  },
  watch: {
    mv: {
      handler(newVal, oldVal) {
        const that = this;
        let video = that.$refs.video;
        let mv = that.mv;
        mv.isPlaying ? video.play() : video.pause();
        if (!newVal.isDraging) return false;
        video.currentTime = newVal.currentTime;
        mv.isDraging = false;
        that.setMv(mv);
      },
      deep: true,
    },
  },
  methods: {
    canplay: function () {
      const that = this;
      let mv = that.mv;
      mv.isPlaying = true;
      that.setMv(mv);
    },
    timeupdate: function () {
      const that = this;
      let video = that.$refs.video;
      if (!video) return false;
      let mv = that.mv;
      that.$set(mv, "currentTime", video.currentTime);
      that.$set(mv, "duration", video.duration);
      that.setMv(mv);
    },
    toggleMvPlaying: function () {
      const that = this;
      let mv = that.mv;
      mv.isPlaying = !mv.isPlaying;
      that.setMv(mv);
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
      setPlayState: "SET_PLAY_STATE",

      setMv: "SET_MV",
    }),
  },
  mounted: function () {
    const that = this;
    if (that.playState) {
      that.setPlayState(false);
      that.isPlaying = true;
    }
    that.getdata();
  },
  destroyed: function () {
    const that = this;
    if (that.isPlaying) that.setPlayState(true);
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.container {
  height: 100vh;
  @include suspension;
  background: center no-repeat $theme-BLACK;
  background-size: 0;
  overflow: hidden;
  z-index: $zIndex-XXL;

  box-sizing: border-box;
  color: #fff;
  .interaction {
    max-height: 40%;
    margin-top: 1rem;
    position: relative;
    background-color: #101010;
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
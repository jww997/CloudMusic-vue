<template>
  <div class="container">
    <navbar :title="'视频'" :fixed="false"></navbar>
    <video
      class="video"
      ref="video"
      :src="url"
      :poster="info.cover"
      controls
      autoplay
      loop
      v-if="info.cover"
    ></video>
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
    ...mapState(["playState", "mvId"]),
  },
  methods: {
    getdata: function () {
      const that = this;
      // let id = that.$route.query.id;
      let id = that.mvId;
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
  background: center no-repeat #000;
  background-size: 0;
  overflow: hidden;
  z-index: $zIndex-XXL;

  box-sizing: border-box;
  color: #fff;
  .video {
    margin-top: 1.5rem;
    width: 100%;
    min-height: 5rem;
  }
}
</style>
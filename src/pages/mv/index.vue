<template>
  <div class="container">
    <navbar :title="'视频'" fixed></navbar>
    <video class="video" :src="url" controls autoplay></video>

    <info :info="info"></info>
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
    };
  },
  computed: {
    ...mapState(["playState"]),
  },
  methods: {
    ...mapMutations({
      setPlayState: "SET_PLAY_STATE",
    }),
  },
  mounted: function () {
    const that = this;

    console.log(that.playState);
    if (that.playState) {
      that.setPlayState(false);
      that.isPlaying = true;
    }

    let id = that.$route.query.id;
    console.log(`MVid = ${id}`);
    that.$api
      .getMvDetail({ mvid: id })
      .then((res) => {
        console.log(res);
        that.info = res.data.data;
        return that.$api.getMvUrl({ id });
      })
      .then((res) => {
        that.url = res.data.data.url;
        return that.$api.getMvDetailInfo({ mvid: id });
      })
      .then((res) => {
        console.log(res);
      });
  },
  destroyed: function () {
    const that = this;
    if (that.isPlaying) {
      that.setPlayState(true);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.container {
  height: 100vh;
  @include suspension;
  position: relative;

  padding-top: 1rem;
  box-sizing: border-box;

  background-color: #000;
  color: #fff;

  .video {
    margin-top: 1.5rem;
    width: 100%;
    min-height: 5rem;
  }
}
</style>
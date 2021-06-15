<template>
  <div class="mv">
    <!-- 顶部导航栏 -->
    <navbar title="视频" />
    <!-- 视频 -->
    <musicvideo :url="url" :poster="info.cover" />
    <!-- 视频文本介绍 && 用户对视频的操作 -->
    <detail :info="info" :options="options" @toComment="toComment" />
    <!-- 控制视频 && 视频名称 -->
    <detail2 :info="info" :liked="count.liked" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { formatUnit } from "@/assets/js/filter.js";
import { toPages } from "@/assets/js/util.js";
import Navbar from "@/components/navbar";
import Musicvideo from "./musicvideo";
import Detail from "./detail";
import Detail2 from "./detail2";

export default {
  name: "mv",
  components: {
    Navbar,
    Musicvideo,
    Detail,
    Detail2,
  },
  data() {
    return {
      isMusicPlaying: false, // 记录音乐播放状态
      url: "",
      info: {},
      count: {},

      options: [
        {
          id: "01",
          icon: "&#xe697;",
          name: "点赞",
          handleFn: "",
        },
        {
          id: "02",
          icon: "&#xe65d;",
          name: "评论",
          handleFn: "toComment",
        },
        {
          id: "03",
          icon: "&#xe65c;",
          name: "分享",
          handleFn: "",
        },
        {
          id: "04",
          icon: "&#xe61d;",
          name: "收藏",
          handleFn: "",
        },
      ],
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
    toComment() {
      console.log(1);
      toPages.call(this, {
        name: "comment",
        params: { id: this.mv.id, type: 1 },
      });
    },
    toggleMvPlaying() {
      const that = this;
      that.amendStateObjValue({
        name: "mv",
        key: "isPlaying",
        value: !that.mv.isPlaying,
      });
    },
    getdata() {
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
        });
      that.$api.getMvDetailInfo({ mvid: id }).then((res) => {
        const data = res.data;

        that.count = data;

        this.options.map((item, index) => {
          switch (index) {
            case 0:
              item.count = formatUnit(data.likedCount);
              break;
            case 1:
              item.count = formatUnit(data.shareCount);
              break;
            case 2:
              item.count = formatUnit(data.commentCount);
              break;
          }
        });
      });
    },
    ...mapMutations({
      setMv: "SET_MV",
    }),
    ...mapActions(["amendStateObjValue"]),
  },
  mounted() {
    const that = this;
    if (that.music.isPlaying) {
      that.amendStateObjValue({ key: "isPlaying", value: false });
      that.isMusicPlaying = true;
    }
    that.getdata();
  },
  destroyed() {
    const that = this;
    if (that.isMusicPlaying) {
      that.amendStateObjValue({ key: "isPlaying", value: true });
    }
    //   that.amendStateObjValue({ name: "mv", key: "isPlaying", value: false });
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.mv {
  height: 100vh;
  overflow: hidden;
  background: center no-repeat $black;
  background-size: 0;
  color: $white;
  position: relative;
}
</style>
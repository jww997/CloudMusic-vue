<template>
  <div class="children">
    <div class="top">
      <span class="iconfont">&#xe66a;</span>
      <span class="iconfont">&#xe694;</span>
      <span class="iconfont">&#xe612;</span>
      <span class="iconfont">&#xe65d;</span>
      <span class="iconfont">&#xe690;</span>
    </div>
    <div class="progress">
      <div class="text">
        {{ formatTime(currentTime) }}
      </div>
      <div class="strip">
        <van-slider
          v-model="percentage"
          :step="10"
          button-size="10px"
          active-color="#f00"
          inactive-color="#494949"
          @change="togglePercentage"
        />
      </div>
      <div class="text">
        {{ formatTime(duration) }}
      </div>
    </div>
    <div class="bottom">
      <span class="iconfont">&#xe600;</span>
      <span class="iconfont">&#xe663;</span>
      <span
        :class="{
          'iconfont center': true,
          playing: playState,
        }"
        @click="toggleStatus"
        >{{ playState ? "&#xe665;" : "&#xe666;" }}
      </span>
      <span class="iconfont">&#xe668;</span>
      <span class="iconfont">&#xe664;</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { formatTime } from "@/assets/js/filter.js";
export default {
  name: "handle",
  data: function () {
    return {
      percentage: 0,
    };
  },
  props: {
    lyric: {
      type: Object,
      default: {},
    },
  },
  computed: {
    ...mapGetters(["playState", "currentTime", "duration"]),
  },
  watch: {
    currentTime: function () {
      const that = this;
      that.percentage =
        Number.parseFloat(that.currentTime / that.duration) * 100;
    },
  },
  methods: {
    formatTime,
    togglePercentage: function (val) {
      const that = this;

      

      // let audio = that.$store.state.audio;
      // let currentTime = audio.example.duration * (val / 100);
      // audio.example.currentTime = currentTime; // 根据选中百分比修改进度条
      // that.$emit("seekLyric", currentTime * 1000); // 接收秒数，要处理下
    },
    toggleStatus: function () {
      const that = this;
      that.setPlayState(!that.playState);
    },

    ...mapMutations({
      setPlayState: "SET_PLAY_STATE",
    }),
  },
  // created: function () {
  //   const that = this;
  //   let example = that.$store.state.audio.example;
  // that.$store.commit("timeupdate", () => {
  //   that.currentTime = formatTime(example.currentTime);
  //   that.duration = formatTime(example.duration);
  // }); // 播放时间更新
  // that.$store.commit("ended", () => {
  //   that.$store.commit("pause");
  //   //   that.lyric.stop();
  // }); // 歌曲结束处理
  // },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  flex-shrink: 0;
  width: 100%;
  padding: 0.5rem 0;
  // @include positionCenter;
  // top: auto;
  >>> .van-progress__pivot {
    min-width: 0.15rem;
    width: 0.15rem;
    height: 0.15rem;
    padding: 0;
    border-radius: 50%;
    top: 0;
  }
  .iconfont {
    color: #fff;
    font-size: 0.4rem;
  }
  .top {
    padding: 0.3rem 1rem;
    @include flexSpaceAround;
  }
  .progress {
    margin: 0.3rem;
    font-size: 0.2rem;
    color: #fff;
    @include flexSpaceBetween;
    .strip {
      width: 5rem;
    }
    .text {
      width: 0.7rem;
      text-align: center;
      @include omit;
    }
  }
  .bottom {
    padding: 0.3rem 1rem;
    @include flexSpaceAround;
    .center {
      transform: scale(2);
    }
  }
}
</style>
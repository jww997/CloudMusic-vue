<template>
  <div class="children">
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
      <!-- <span class="iconfont">&#xe600;</span> -->
      <span class="iconfont" @click="prev">&#xe663;</span>
      <span
        :class="{
          'iconfont center': true,
          playing: playState,
        }"
        @click="toggleStatus"
        >{{ playState ? "&#xe665;" : "&#xe666;" }}
      </span>
      <span class="iconfont" @click="next">&#xe668;</span>
      <!-- <span class="iconfont">&#xe664;</span> -->
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
    ...mapGetters([
      "playState",
      "playIndex",
      "playlist",
      "currentTime",
      "duration",
    ]),
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
    prev: function () {
      console.log("上一首");
      const that = this;
      if (that.playIndex == 0) {
        that.setPlayIndex(that.playlist.length - 1);
      } else if (that.playIndex - 1 <= that.playlist.length) {
        that.setPlayIndex(that.playIndex - 1);
      }
    },
    next: function () {
      console.log("下一首");
      const that = this;
      if (that.playIndex == that.playlist.length - 1) {
        that.setPlayIndex(0);
      } else if (that.playIndex + 1 <= that.playlist.length) {
        that.setPlayIndex(that.playIndex + 1);
      }
    },
    togglePercentage: function (val) {
      const that = this;
      // let i = that.duration * (val / 100); // 根据选中百分比修改进度条
      // that.setPlayState(false);
      // that.setCurrentTime(i); // 接收秒数，要处理下
      // that.setPlayState(true);
    },
    toggleStatus: function () {
      const that = this;
      that.setPlayState(!that.playState);
    },

    ...mapMutations({
      setPlayState: "SET_PLAY_STATE",
      setPlayIndex: "SET_PLAY_INDEX",
      setCurrentTime: "SET_CURRENTTIME",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  flex-shrink: 0;
  width: 100%;
  padding-bottom: 0.5rem;
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
    font-size: $text-L;
  }
  .progress {
    margin: 0.3rem;
    font-size: $text-S;
    color: #fff;
    @include flexSpaceBetween;
    .strip {
      flex-grow: 1;
      min-width: 4.5rem;
      margin: 0 0.3rem;
    }
    .text {
      flex-shrink: 0;
      width: 1.2rem;
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
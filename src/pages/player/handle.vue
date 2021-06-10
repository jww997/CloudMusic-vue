<template>
  <div class="handle">
    <!-- 顶部操作条 -->
    <div class="options">
      <span class="iconfont">&#xe66a;</span>
      <span class="iconfont">&#xe694;</span>
      <span class="iconfont">&#xe612;</span>
      <span class="iconfont">&#xe65d;</span>
      <span class="iconfont">&#xe690;</span>
    </div>
    <!-- 进度条 -->
    <div class="progress">
      <div class="time">
        {{ formatTime(music.currentTime * 1000, 2) }}
      </div>
      <van-slider
        step="1"
        class="strip"
        button-size="10"
        active-color="#f00"
        inactive-color="#fff"
        v-model="percentage"
        @input="togglePercentage"
      />
      <div class="time">
        {{ formatTime(music.duration * 1000, 2) }}
      </div>
    </div>
    <!-- 底部操作条 -->
    <div class="options">
      <span
        class="iconfont"
        @click="toggleModeIndex"
        v-html="music.modeList[music.modeIndex].icon"
      ></span>
      <span class="iconfont" @click="prev">&#xe663;</span>
      <van-icon
        class="circle"
        name="pause-circle-o"
        v-if="music.isPlaying"
        @click.stop="toggleStatus"
      />
      <van-icon
        class="circle"
        name="play-circle-o"
        v-else
        @click.stop="toggleStatus"
      />
      <span class="iconfont" @click="next">&#xe668;</span>
      <span class="iconfont" @click="toggleDrawerShow">&#xe664;</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { formatTime } from "@/assets/js/filter.js";

export default {
  name: "handle",
  props: ["lyric"],
  data: function () {
    return {
      percentage: 0,
    };
  },
  computed: {
    currentTime(val, oldVal) {
      const that = this;
      return that.music.currentTime;
    },
    ...mapGetters(["playlistToast", "music"]),
  },
  watch: {
    currentTime: function (val) {
      const that = this;
      that.percentage = Number.parseFloat(val / that.music.duration) * 100;
    },
  },
  methods: {
    formatTime,
    prev: function () {
      console.log("上一首");
      const that = this;
      let currentIndex = that.music.currentIndex;
      let currentList = that.music.currentList;
      if (currentIndex == 0) {
        that.amendStateObjValue({
          key: "currentIndex",
          value: currentList.length - 1,
        });
      } else if (currentIndex - 1 <= currentList.length) {
        that.amendStateObjValue({
          key: "currentIndex",
          value: currentIndex - 1,
        });
      }
    },
    next: function () {
      console.log("下一首");
      const that = this;
      let currentIndex = that.music.currentIndex;
      let currentList = that.music.currentList;
      if (currentIndex >= currentList.length - 1) {
        that.amendStateObjValue({ key: "currentIndex", value: 0 });
      } else if (currentIndex + 1 <= currentList.length) {
        that.amendStateObjValue({
          key: "currentIndex",
          value: currentIndex + 1,
        });
      }
    },
    togglePercentage: function (val) {
      const that = this;
      let i = that.music.duration * (val / 100); // 根据选中百分比修改进度条
      that.amendStateObjValue({ key: "isDraging", value: true });
      that.amendStateObjValue({ key: "currentTime", value: i }); // 接收秒数，要处理下
    },
    toggleStatus: function () {
      const that = this;
      that.amendStateObjValue({
        key: "isPlaying",
        value: !that.music.isPlaying,
      });
    },
    toggleModeIndex: function () {
      const that = this;
      let i = that.music.modeIndex + 1;
      let min = 0;
      let max = 2;
      i > max ? (i = min) : "";
      i < min ? (i = max) : "";
      that.amendStateObjValue({ key: "modeIndex", value: i });
    },

    toggleDrawerShow: function () {
      const that = this;
      that.amendStateObjValue({ key: "isShowDrawer", value: true });
    },
    ...mapMutations({
      setPlaylistToast: "SET_PLAY_LIST_TOAST",
    }),
    ...mapActions(["amendStateObjValue"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.handle {
  padding: $padding-sm;
  @include positionCenter;
  bottom: $padding-sm;
  top: auto;
  .progress,
  .options {
    color: $white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .progress {
    padding: $padding-sm 0;
    .strip {
      flex-grow: 1;
      margin: 0 $padding-sm;
    }
    .time {
      flex-shrink: 0;
      max-width: 2rem;
      font-size: $font-size-lg;
      @include omit;
    }
  }
  .options {
    padding: $padding-sm * 1.5 $padding-sm * 4;
    .iconfont {
      font-size: $font-size-sm * 2;
    }
    .circle {
      transform: scale(1.5);
    }
  }
  // .list {
  //   height: 100%;
  //   line-height: $text-L;
  //   padding: 1.8rem 0.3rem 0;
  //   box-sizing: border-box;
  //   transition: 1s;
  //   position: relative;
  //   overflow: hidden;
  //   .top {
  //     position: absolute;
  //     right: 0.3rem;
  //     left: 0.3rem;
  //     top: 0.3rem;
  //     .title {
  //       height: 0.8rem;
  //       @include flexCenter;
  //       justify-content: flex-start;
  //       font-weight: bold;
  //       .left {
  //         font-size: $text-M;
  //       }
  //       .length {
  //         font-size: $text-XS;
  //         color: $theme-GRAY;
  //       }
  //     }
  //     .operation {
  //       @include flexSpaceBetween;
  //       // margin-bottom: $text-XXS;
  //       .module {
  //         width: 2rem;
  //         margin-right: $text-XXS;
  //         display: flex;
  //         .iconfont {
  //           font-size: $text-S;
  //           color: $theme-GRAY;
  //         }
  //         .text {
  //           font-size: $text-XS;
  //           margin-left: $text-XXXS;
  //         }
  //         &:first-child {
  //           flex-grow: 1;
  //         }
  //       }
  //       .clear {
  //         font-size: $text-S;
  //         color: $theme-GRAY;
  //       }
  //     }
  //   }
  //   .songs {
  //     height: 100%;
  //     overflow: scroll;
  //     .song {
  //       height: $text-XXXL;
  //       @include flexSpaceBetween;
  //       &.active,
  //       .playing {
  //         font-size: $text-L;
  //         color: $theme-RED;
  //       }
  //       &.active {
  //         .playing {
  //           display: block;
  //           margin-left: -$text-XXXS;
  //         }
  //         .monicker {
  //           .name,
  //           .ar {
  //             color: $theme-RED;
  //           }
  //         }
  //       }
  //       .playing,
  //       .delete {
  //         flex-shrink: 0;
  //       }
  //       .playing {
  //         display: none;
  //       }
  //       .monicker {
  //         flex-grow: 1;
  //         padding-bottom: $text-XXXS;
  //         box-sizing: border-box;
  //         @include flexCenter;
  //         justify-content: flex-start;
  //         @include omit;
  //         .name {
  //           font-size: $text-S;
  //         }
  //         .ar {
  //           font-size: $text-XS;
  //           color: $theme-GRAY;
  //           &::before {
  //             content: "-";
  //             margin: 0 $text-XXXS;
  //           }
  //         }
  //       }
  //       .delete {
  //         font-size: $text-S;
  //         color: $theme-GRAY;
  //       }
  //     }
  //   }
  // }
}
</style>
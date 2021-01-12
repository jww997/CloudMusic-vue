<template>
  <div class="children">
    <div class="progress">
      <div class="text">
        {{ formatTime(currentTime * 1000, 2) }}
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
        {{ formatTime(duration * 1000, 2) }}
      </div>
    </div>
    <div class="bottom">
      <span
        class="iconfont"
        @click="toggleSequence"
        v-html="playMode[playSequence].icon"
      ></span>
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
      <span class="iconfont" @click="toggleShowList">&#xe664;</span>
    </div>
    <!-- <bottomlist></bottomlist> -->
    <van-popup
      round
      lock-scroll
      position="bottom"
      v-model="isShowList"
      :style="{ height: '60%' }"
    >
      <div class="list">
        <div class="top">
          <div class="title">
            <span class="left">当前播放</span>
            <span class="length">({{ playlist.length }})</span>
          </div>
          <div class="operation">
            <div class="module" @click="toggleSequence">
              <span
                class="iconfont"
                v-html="playMode[playSequence].icon"
              ></span>
              <span class="text">{{ playMode[playSequence].text }}</span>
            </div>
            <div class="module">
              <span class="iconfont">&#xe61d;</span>
              <span class="text">收藏全部</span>
            </div>
            <div class="iconfont clear">&#xe632;</div>
          </div>
        </div>
        <div class="songs">
          <div
            v-for="(item, index) in playlist"
            :key="item.id"
            :class="{ song: true, active: item.id == currentSong.id }"
            @click="setPlayIndex(index)"
          >
            <div class="iconfont playing">&#xe604;</div>
            <div class="monicker">
              <span class="name">{{ item.name }}</span>
              <span class="ar">{{ item.ar[0].name }}</span>
            </div>
            <div class="iconfont delete">&#xe626;</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { formatTime } from "@/assets/js/filter.js";
import Bottomlist from "@/components/bottomlist";
export default {
  name: "handle",
  props: {
    lyric: {
      type: Object,
      default: {},
    },
  },
  components: {
    Bottomlist,
  },
  data: function () {
    return {
      percentage: 0,
      isShowList: false,
    };
  },
  computed: {
    ...mapGetters([
      "playState",
      "playIndex",
      "playlist",
      "playlistShow",
      "playSequence",
      "playMode",
      "currentSong",
      "currentTime",
      "duration",
    ]),
  },
  watch: {
    currentTime: function (val) {
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
    toggleShowList: function () {
      const that = this;
      that.isShowList = !that.isShowList;
      // console.log(!that.playlistShow);
      // that.setPlaylistShow(!that.playlistShow);
    },
    toggleSequence: function () {
      const that = this;
      let i = that.playSequence + 1;
      let min = 0;
      let max = 2;
      i > max ? (i = min) : "";
      i < min ? (i = max) : "";
      that.setPlaySequence(i);
    },
    ...mapMutations({
      setPlayState: "SET_PLAY_STATE",
      setPlayIndex: "SET_PLAY_INDEX",
      setPlaylistShow: "SET_PLAY_LIST_SHOW",
      setPlaySequence: "SET_PLAY_SEQUENCE",
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

  >>> .van-progress__pivot {
    min-width: 0.15rem;
    width: 0.15rem;
    height: 0.15rem;
    padding: 0;
    border-radius: 50%;
    top: 0;
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
    padding: 0.5rem 1rem;
    @include flexSpaceAround;
    .center {
      transform: scale(2);
    }
    .iconfont {
      color: #fff;
      font-size: $text-L;
    }
  }
  .list {
    height: 100%;
    line-height: $text-L;
    padding: 1.8rem 0.3rem 0;
    box-sizing: border-box;
    transition: 1s;
    position: relative;
    overflow: hidden;
    .top {
      position: absolute;
      right: 0.3rem;
      left: 0.3rem;
      top: 0.3rem;
      .title {
        height: 0.8rem;
        @include flexCenter;
        justify-content: flex-start;
        font-weight: bold;
        .left {
          font-size: $text-M;
        }
        .length {
          font-size: $text-XS;
          color: $theme-GRAY;
        }
      }
      .operation {
        @include flexSpaceBetween;
        // margin-bottom: $text-XXS;
        .module {
          width: 2rem;
          margin-right: $text-XXS;
          display: flex;
          .iconfont {
            font-size: $text-S;
            color: $theme-GRAY;
          }
          .text {
            font-size: $text-XS;
            margin-left: $text-XXXS;
          }
          &:first-child {
            flex-grow: 1;
          }
        }
        .clear {
          font-size: $text-S;
          color: $theme-GRAY;
        }
      }
    }
    .songs {
      height: 100%;
      overflow: scroll;
      .song {
        height: $text-XXXL;
        @include flexSpaceBetween;
        &.active,
        .playing {
          font-size: $text-L;
          color: $theme-RED;
        }
        &.active {
          .playing {
            display: block;
            margin-left: -$text-XXXS;
          }
          .monicker {
            .name,
            .ar {
              color: $theme-RED;
            }
          }
        }
        .playing,
        .delete {
          flex-shrink: 0;
        }
        .playing {
          display: none;
        }
        .monicker {
          flex-grow: 1;
          padding-bottom: $text-XXXS;
          box-sizing: border-box;
          @include flexCenter;
          justify-content: flex-start;
          @include omit;
          .name {
            font-size: $text-S;
          }
          .ar {
            font-size: $text-XS;
            color: $theme-GRAY;
            &::before {
              content: "-";
              margin: 0 $text-XXXS;
            }
          }
        }
        .delete {
          font-size: $text-S;
          color: $theme-GRAY;
        }
      }
    }
  }
}
</style>
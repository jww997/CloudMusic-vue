<template>
  <div class="kid">
    <van-popup
      round
      lock-scroll
      position="bottom"
      v-model="playlistToast"
      safe-area-inset-bottom
      :style="{ height: '60%' }"
      @close="close"
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
export default {
  name: "bottomlist",
  computed: {
    ...mapGetters([
      "currentSong",
      "playMode",
      "playlist",
      // "playlistToast",
      "playSequence",
    ]),
  },
  props: {
    playlistToast: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleSequence: function () {
      const that = this;
      let i = that.playSequence + 1;
      let min = 0;
      let max = 2;
      i > max ? (i = min) : "";
      i < min ? (i = max) : "";
      that.setPlaySequence(i);
    },
    close: function () {
      const that = this;
      that.setPlaylistToast(false);
    },
    ...mapMutations({
      setPlayState: "SET_PLAY_STATE",
      setPlayIndex: "SET_PLAY_INDEX",
      setPlaylistToast: "SET_PLAY_LIST_TOAST",
      setPlaySequence: "SET_PLAY_SEQUENCE",
      setPlayDrag: "SET_PLAY_DRAG",
      setCurrentTime: "SET_CURRENTTIME",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.kid {
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
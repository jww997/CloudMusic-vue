<template>
  <div class="drawerlist">
    <van-popup
      round
      lock-scroll
      position="bottom"
      v-model="show"
      safe-area-inset-bottom
      :style="{ height: '60%' }"
      @close.stop="toggleDrawerHide"
    >
      <div class="list">
        <div class="top">
          <div class="title">
            <span class="left">当前播放</span>
            <span class="length">({{ music.currentList.length }})</span>
          </div>
          <div class="operation">
            <div class="module" @click.stop="toggleModeIndex">
              <span
                class="iconfont"
                v-html="music.modeList[music.modeIndex].icon"
              ></span>
              <span class="text">{{
                music.modeList[music.modeIndex].text
              }}</span>
            </div>
            <div class="module">
              <span class="iconfont">&#xe61d;</span>
              <span class="text">收藏全部</span>
            </div>
            <div class="iconfont clear" @click.stop="clear">&#xe632;</div>
          </div>
        </div>
        <div class="songs" v-if="music.currentList.length">
          <div
            v-for="(item, index) in music.currentList"
            :key="item.id"
            :class="{ song: true, active: item.id == music.id }"
            @click.stop="toggleMusic(item.id, index)"
          >
            <div class="iconfont playing">&#xe604;</div>
            <div class="monicker">
              <span class="name">{{ item.name }}</span>
              <span class="ar" v-if="item.ar">{{ item.ar[0].name }}</span>
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
  props: ["show"],
  data() {
    return { isShow: false };
  },
  computed: {
    isShowDrawer() {
      const that = this;
      return that.music.isShowDrawer;
    },
    ...mapGetters(["music"]),
  },
  watch: {
    isShowDrawer(val, oldVal) {
      const that = this;
      that.isShow = val;
    },
  },
  methods: {
    toggleModeIndex: function () {
      const that = this;
      let i = that.music.modeIndex + 1;
      let min = 0;
      let max = 2;
      i > max ? (i = min) : "";
      i < min ? (i = max) : "";
      that.amendStateObjValue({ key: "modeIndex", value: i });
    },
    toggleDrawerHide: function () {
      const that = this;
      that.amendStateObjValue({ key: "isShowDrawer", value: false });
    },
    toggleMusic(id, index) {
      const that = this;
      if (that.music.id == id) {
        // toPages({
        //   name: "/player",
        // });
        // that.amendStateObjValue({ key: "isShow", value: true });
      } else {
        that.amendStateObjValue({ key: "id", value: id });
        that.amendStateObjValue({ key: "currentIndex", value: index });
      }
    },
    clear() {
      const that = this;
      that.$vant.Toast.success("清理成功");
      // that.amendStateObjValue({ key: "currentId", value: -1 });
      that.amendStateObjValue({ key: "currentIndex", value: -1 });
      that.amendStateObjValue({ key: "currentList", value: [] });
    },
    ...mapActions(["amendStateObjValue"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.drawerlist {
  z-index: 200;



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
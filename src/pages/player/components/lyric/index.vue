<template>
  <div class="children">
    <div class="volume">
      <!-- <div class="iconfont">&#xe66d;</div> -->
      <van-icon size="22" color="#fff" name="volume-o" v-if="isMute" />
      <van-icon
        size="22"
        color="#fff"
        name="volume"
        @click.stop="toggleMusicVolume(0)"
        v-else
      />
      <div class="slider">
        <van-slider
          v-model="music.volume"
          step="1"
          button-size="10px"
          active-color="#fff"
          inactive-color="#494949"
          @input="toggleMusicVolume"
        />
      </div>
      <div class="iconfont"></div>
    </div>
    <div class="wrap">
      <div
        class="lyric"
        :style="{
          transform: `translateY(-${lineHeight * lyric.curLine}rem)`,
        }"
      >
        <div
          :class="{
            line: true,
            active: index == lyric.curLine,
          }"
          :style="{
            lineHeight: `${lineHeight}rem`,
          }"
          v-for="(item, index) in lyric.lines"
          :key="index"
          :data-time="item.time"
        >
          {{ item.txt }}
        </div>
        <div class="line active" v-if="!lyric.lines">暂无歌词</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "lyric",
  props: {
    lyric: {
      type: Object,
      default: {},
    },
  },
  data: function () {
    return {
      lineHeight: 0.9,
      // isMute: false,
    };
  },
  computed: {
    isPlaying() {
      const that = this;
      return that.music.isPlaying;
    },
    currentTime() {
      const that = this;
      return that.music.currentTime;
    },
    volume() {
      const that = this;
      return that.music.volume;
    },
    isMute() {
      const that = this;
      return that.music.volume == 0;
    },
    ...mapGetters(["music"]),
  },
  watch: {
    isPlaying: function (val) {
      const that = this;
      try {
        that.lyric.togglePlay();
      } catch (error) {}
    },
    currentTime: function (val) {
      const that = this;
      try {
        that.lyric.seek(val * 1000);
      } catch (error) {}
    },
    volume: function (val) {
      const that = this;
      that.isMute = val == 0 ? true : false;
    },
  },
  methods: {
    toggleMusicVolume(val) {
      const that = this;
      that.amendStateObjValue({ key: "volume", value: val });
    },
    ...mapActions(["amendStateObjValue"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  height: 100%;
  display: flex;
  flex-direction: column;
  .volume {
    flex-shrink: 0;
    width: 100%;
    margin: 0.3rem;
    @include flexSpaceBetween;
    .iconfont {
      flex-shrink: 0;
      width: 0.8rem;
      height: 0.8rem;
      font-size: $text-M;
      color: $theme-WHITE;
      @include flexCenter;
    }
    .slider {
      flex-grow: 1;
      margin: 0 0.3rem;
    }
  }
  .wrap {
    flex-grow: 1;
    height: 100%;
    margin-top: 0.3rem;
    overflow: hidden;
    mask-image: linear-gradient(
      rgba(255, 255, 255, 0),
      #fff 30%,
      #fff 70%,
      rgba(255, 255, 255, 0)
    );
    -webkit-mask-image: linear-gradient(
      rgba(255, 255, 255, 0),
      #fff 30%,
      #fff 70%,
      rgba(255, 255, 255, 0)
    );
    .lyric {
      transition: 1s;
      padding-top: 50%;
      box-sizing: border-box;
      .line {
        font-size: $text-S;
        text-align: center;
        transition: 1s;
        color: #aaa;
        &.active {
          color: #fff;
          font-size: $text-M;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
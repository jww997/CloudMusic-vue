<template>
  <div class="lyric" @click="$emit('handleClick')">
    <!-- 音量控制 -->
    <div class="volume">
      <van-icon
        size="22"
        color="#fff"
        name="volume-o"
        v-if="isMute"
        @click.stop="toggleMusicVolume(100)"
      />
      <van-icon
        size="22"
        color="#fff"
        name="volume"
        @click.stop="toggleMusicVolume(0)"
        v-else
      />
      <van-slider
        class="slider"
        step="1"
        button-size="10"
        active-color="#f00"
        inactive-color="#fff"
        v-model="music.volume"
        @input="toggleMusicVolume"
      />
    </div>
    <!-- 歌词滚动 -->
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
  data() {
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
      return that.volume == 0;
    },
    ...mapGetters(["music"]),
  },
  watch: {
    isPlaying (val) {
      const that = this;
      try {
        that.lyric.togglePlay();
      } catch (error) {}
    },
    currentTime (val) {
      const that = this;
      const currentTime = (val * 1000).toFixed(3);
      that.lyric.seek(currentTime);
      // try {
      // } catch (error) {}
    },
    volume (val) {
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
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.lyric {
  padding: 0 $padding-sm;
  .volume {
    margin: $padding-sm 0;
    @include flexSpaceBetween;
    .iconfont {
      font-size: $font-size-sm * 2;
      color: $white;
    }
    .slider {
      flex-grow: 1;
      margin-left: $padding-sm;
    }
  }
  .wrap {
    height: 10rem;
    margin-top: $padding-sm;
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
      padding-top: 50%;
      box-sizing: border-box;
      line-height: $line-height-xs;
      transition: $animation-duration-base * 2;
      .line {
        font-size: $font-size-lg;
        color: $background-color-dark;
        transition: $animation-duration-base * 2;
        text-align: center;
        &.active {
          color: $background-color-light;
          font-size: $font-size-lg * 1.5;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
<template>
  <div
    class="children"
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
    };
  },
  computed: {
    ...mapGetters(["playState", "currentTime", "duration"]),
  },
  watch: {
    playState: function (val) {
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
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  height: 100%;
  transition: 1s;
  padding-top: 50%;
  box-sizing: border-box;
  transition: 1s;
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
</style>
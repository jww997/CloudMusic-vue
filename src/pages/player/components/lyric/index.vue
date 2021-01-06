<template>
  <div
    class="children"
    :style="{
      transform: `translateY(-${1 * lyric.curLine}rem)`,
    }"
  >
    <div
      :class="{
        line: true,
        active: index == lyric.curLine,
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
  // padding-top: 4rem;
  padding-top: 50%;
  box-sizing: border-box;

  .line {
    line-height: 1rem;
    transition: 1s;
    font-size: $text-M;
    text-align: center;
    transition: 1s;
    color: #aaa;
    &.active {
      color: #fff;
      font-size: $text-L;
      font-weight: bold;
    }
  }
}
</style>
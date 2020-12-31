<template>
  <div
    class="children"
    :style="{
      transform: `translateY(-${0.7 * lyric.curLine}rem)`,
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
  // watch: {
  //   playState: function (val) {
  //     const that = this;
  //     console.log(val);
  //     val ? that.lyric.play() : that.lyric.stop();
  //   },
  // },
  computed: {
    ...mapGetters(["playState", "currentTime", "duration"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  padding-top: 5rem;
  overflow: hidden;
  transition: 1s;
  .line {
    line-height: 0.7rem;
    text-align: center;
    transition: 1s;
    color: #aaa;
    &.active {
      color: #fff;
      font-weight: bold;
    }
  }
}
</style>
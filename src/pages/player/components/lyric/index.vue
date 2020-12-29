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
  </div>
</template>

<script>
export default {
  name: "lyric",
  props: {
    lyric: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
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
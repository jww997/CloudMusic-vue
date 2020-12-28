<template>
  <div
    class="children"
    :style="{
      transform: `translateY(-${0.7 * $store.state.audio.lyric.curLine}rem)`,
    }"
  >
    <div
      :class="{
        line: true,
        active: index == $store.state.audio.lyric.curLine,
      }"
      v-for="(item, index) in $store.state.audio.lyric.lines"
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
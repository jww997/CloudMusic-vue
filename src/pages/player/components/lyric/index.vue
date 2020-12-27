<template>
  <div class="children">
    <div class="line">{{ list }}</div>
  </div>
</template>

<script>
export default {
  name: "lyric",
  props: {
    list: {},
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
.children {
  height: 50vh;
  overflow: hidden;
  .line {
    line-height: 0.7rem;
    text-align: center;
    color: #fff;
  }
}
</style>
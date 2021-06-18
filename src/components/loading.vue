<template>
  <div class="loading">
    <van-overlay :show="show" z-index="9999">
      <van-loading class="tip" vertical>加载中...</van-loading>
    </van-overlay>
  </div>
</template>

<script>
export default {
  name: "loading",
  props: ["show"],
};
</script>

<style lang="scss">
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.loading {
  width: 100vw;
  height: 100vh;
  @include flexCenter;
  .tip {
    width: 3rem;
    height: 3rem;
    font-size: $font-size-sm;
    border-radius: $border-radius-sm;
    background-color: $white;
    color: $theme-color;
    @include positionCenter;
    @include flexCenter;
  }
}
</style>
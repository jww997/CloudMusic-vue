<template>
  <div class="container">
    <div class="top">
      <span class="iconfont">&#xe66a;</span>
      <span class="iconfont">&#xe694;</span>
      <span class="iconfont">&#xe66a;</span>
      <span class="iconfont">&#xe65d;</span>
      <span class="iconfont">&#xe66a;</span>
    </div>
    <div class="bottom">
      <span class="iconfont">&#xe66a;</span>
      <span class="iconfont">&#xe66a;</span>
      <span class="iconfont">&#xe66a;</span>
      <span class="iconfont">&#xe66a;</span>
      <span class="iconfont">&#xe66a;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "handle",
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
.container {
  .iconfont {
    color: #fff;
    font-size: 0.5rem;
  }
  .top {
    padding: 0.3rem 1rem;
    @include flexSpaceAround;
  }
  .bottom {
    padding: 0.3rem 1rem;
    @include flexSpaceAround;
  }
}
</style>
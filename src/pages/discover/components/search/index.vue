<template>
  <div class="search">
    <div class="icon iconfont">&#xe70d;</div>
    <div class="frame">
      <span class="icon iconfont">&#xe607;</span>
      <span class="text">123</span>
    </div>
    <div class="icon iconfont">&#xe60a;</div>
  </div>
</template>

<script>
export default {
  name: "Search",
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
.search {
  margin: 0.2rem 0;
  @include horizontalBetween;
  .icon {
    flex-shrink: 0;
    margin: 0.2rem;
    font-size: 0.4rem;
  }
  .frame {
    flex-grow: 1;
    box-shadow: 0 0 0.8rem 0 #ddd;
    border-radius: 3rem;
    padding: 0 0.1rem;
    overflow: hidden;
    color: #666;
    @include horizontalBetween;
    .iconfont {
      font-size: 0.3rem;
    }
    .text {
      flex-grow: 1;
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.35rem;
    }
  }
}
</style>
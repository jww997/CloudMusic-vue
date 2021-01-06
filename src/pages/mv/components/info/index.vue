<template>
  <div class="children">
    <div></div>
    <div class="song">
      <div
        :class="{
          iconfont: true,
          like: true,
          active: isLike,
        }"
        v-html="isLike ? '&#xe669;' : '&#xe66a;'"
      ></div>
      <div class="name">{{ info.name }} - {{ info.artistName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "info",
  props: {
    info: {},
  },
  data: function () {
    return { isLike: true };
  },
};
</script>


<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  @include positionCenter;
  top: auto;
  .song {
    @include flexCenter;
    justify-content: flex-start;
    padding: 0.5rem 0.3rem;
    .like {
      width: 1rem;
      font-size: 0.7rem;
      text-align: center;
      &.active {
        color: #ff3e43;
      }
    }
    .name {
      font-size: 0.3rem;
    }
  }
}
</style>
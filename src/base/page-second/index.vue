<template>
  <transition name="second">
    <div>123</div>
    <router-view class="second"></router-view>
  </transition>
</template>

<script>
export default {
  name: "pageSecond",
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.second {
  // @include suspension;

  position: fixed;
  top: 0;
  // z-index: $zIndex-L;

  &.second-enter,
  &.second-leave-to {
    opacity: 0;
    transform: scale(1.5) translateY(2rem);
  }

  &.second-enter-to,
  &.second-leave {
    opacity: 1;
  }

  &.second-enter-active,
  &.second-leave-active {
    transition: 0.5s;
  }
}
</style>
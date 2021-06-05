<template>
  <div class="slide">
    <van-swipe width="118" :show-indicators="false" :loop="isLoop">
      <van-swipe-item
        class="swiper-item"
        v-for="item in list"
        :key="item.id"
        @click="$emit('handleClick', item)"
      >
        <slot />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "slide",
  props: ["list", "handleClick"],
  data() {
    return {
      isLoop: false, // 是否循环
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.swiper {
  .swiper-item {
    margin-top: 0.3rem;
    padding-left: 0.2rem;
    box-sizing: border-box;
  }
}
</style>
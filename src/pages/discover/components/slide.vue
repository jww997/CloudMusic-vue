<template>
  <div class="slide">
    <van-swipe
      :width="width"
      :autoplay="autoplay"
      :loop="isLoop"
      :indicator-color="indicatorsColor"
      :show-indicators="isShowIndicators"
    >
      <van-swipe-item
        v-for="item in list"
        :key="item.id"
        @click="$emit('handleClick', item)"
      >
        <slot name="box" :item="item" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "slide",
  props: ["width", "autoplay", "indicatorsColor", "list", "handleClick"],
  computed: {
    isLoop() {
      return !!this.$props.autoplay;
    },
    isShowIndicators() {
      return !!this.$props.indicatorsColor;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.slide {
  >>> .van-swipe__indicators {
    bottom: 6px;
    .van-swipe__indicator {
      width: 8px;
      height: 2px;
      border-radius: 30px;
    }
  }
}
</style>
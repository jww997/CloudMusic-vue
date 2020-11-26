<template>
  <div class="banner">
    <van-swipe class="swiper" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        class="swiper-item"
        v-for="item in list"
        :key="item.targetId"
      >
        <div class="box" :data-url="item.url" :data-video="item.video">
          <img class="image" :src="item.imageUrl" />
          <span
            class="text"
            :style="{ backgroundColor: item.titleColor }"
            v-if="item.typeTitle"
            >{{ item.typeTitle }}</span
          >
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "banner",
  props: {
    list: {
      type: Array,
      value: [],
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
.banner {
  .swiper {
    .swiper-item {
      @include horizontalCenter;
      .box {
        width: 7rem;
        border-radius: 0.2rem;
        position: relative;
        overflow: hidden;
        .image {
          width: 100%;
          height: 100%;
        }
        .text {
          font-size: 0.1rem;
          padding: 0.1rem 0.2rem;
          border-radius: 0.15rem 0 0 0;
          opacity: 0.8;
          color: #fff;
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
    }
  }
}
</style>
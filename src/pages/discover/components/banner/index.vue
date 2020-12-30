<template>
  <div class="container">
    <van-swipe class="swiper" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        class="swiper-item"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="box" :data-url="item.url" :data-video="item.video">
          <img class="image" :src="item.pic" />
          <span
            class="text"
            :style="{ backgroundColor: item.titleColor }"
            v-if="item.typeTitle"
            >{{ item.typeTitle }}</span
          >
        </div>
      </van-swipe-item>
    </van-swipe>
    <ball :list="ball"></ball>
  </div>
</template>

<script> 
import Ball from "@/pages/discover/components/ball";
export default {
  name: "banner",
  components: {
    Ball,
  },
  props: {
    ball: {
      type: Array,
      default: [],
    },
    list: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.container {
  >>> .van-swipe__indicators {
    bottom: 6px;
    .van-swipe__indicator {
      width: 8px;
      height: 2px;
    }
  }
  .swiper {
    .swiper-item {
      @include flexCenter;
      .box {
        // width: 7rem;
        width: 94%;
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
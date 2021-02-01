<template>
  <div class="grandson">
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
  </div>
</template>

<script>
export default {
  name: "swiper",
  props: {
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
.grandson {
  padding-top: 0.3rem;
  >>> .van-swipe__indicators {
    bottom: 6px;
    .van-swipe__indicator {
      width: 8px;
      height: 2px;
      border-radius: 30px;
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
          height: $text-L;
          line-height: $text-L;
          font-size: $text-XXXS;
          padding: 0 $text-XXS;
          border-radius: $text-XS 0 0 0;
          opacity: $opacity-XXL;
          color: $theme-WHITE;
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
    }
  }
}
</style>
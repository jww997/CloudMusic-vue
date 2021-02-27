<template>
  <div class="children">
    <swiper :list="list"></swiper>
    <!-- <ball :list="ball"></ball> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Swiper from "./components/swiper";
// import Ball from "./components/ball";
export default {
  name: "banner",
  props: {
    // ball: {
    //   type: Array,
    //   default: () => [],
    // },
    list: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    Swiper,
    // Ball,
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
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
          font-size: $text-XXXS;
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
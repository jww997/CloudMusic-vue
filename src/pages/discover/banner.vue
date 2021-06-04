<template>
  <div class="children">
    <van-swipe class="swiper" :autoplay="5000" indicator-color="white">
      <van-swipe-item
        class="swiper-item"
        v-for="(item, index) in list"
        :key="index"
        @click="bannerHandle(item)"
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
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { toPages } from "@/assets/js/util.js";
export default {
  name: "banner",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    toPages,
    bannerHandle(val) {
      const that = this;
      switch (val.targetType) {
        case 3000: // 数字单曲
          window.location.href = val.url;
          break;
        case 1: // 新歌首发
          that.amendStateObjValue({ key: "id", value: val.encodeId });
          that.toPages({ name: "player" });
          break;
      }
    },
    ...mapActions(["amendStateObjValue"]),
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
        background-color: $theme-LIGHTGRAY;
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
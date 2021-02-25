<template>
  <div class="children">
    <!-- <van-skeleton title animate :row="1" /> -->
    <div class="header">
      <div class="title">{{ uielement.subTitle.title }}</div>
      <!-- <div class="more" @click="toPages({ name: 'square' })">
        {{ uielement.button.text }} &gt;
      </div> -->
    </div>
    <van-swipe
      class="swiper"
      indicator-color="white"
      width="118"
      :show-indicators="false"
      :loop="false"
    >
      <div v-for="(item, index) in list" :key="index">
        <van-swipe-item
          class="swiper-item"
          v-if="index < 6"
          @click.stop="
            toPages({ name: 'playlist', params: { id: item.creativeId } })
          "
        >
          <cover
            :image="item.uiElement.image.imageUrl"
            :name="item.uiElement.mainTitle.title"
            :count="item.resources[0].resourceExtInfo.playCount"
          ></cover>
        </van-swipe-item>
      </div>
    </van-swipe>
  </div>
</template>

<script>
import { formatUnit } from "@/assets/js/filter";
import { toPages } from "@/assets/js/util.js";
import Cover from "@/components/cover";

export default {
  name: "whirligig",
  components: {
    Cover,
  },
  props: {
    uielement: {
      type: Object,
      default: {},
    },
    list: {
      type: Array,
      default: [],
    },
  },
  methods: {
    formatUnit,
    toPages,
  },
  mounted: function () {
    const that = this;
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  padding-bottom: 0.2rem;
  border-top: 0.15rem solid #eee;

  .header {
    margin: 0.2rem 0.2rem 0.15rem;
    @include flexSpaceBetween;
    .title {
      line-height: $text-XL;
      font-size: $text-M;
      font-weight: bold;
      @include omit;
    }
    .more {
      flex-shrink: 0;
      line-height: $text-L;
      font-size: $text-XS;
      font-weight: bold;
      margin-left: 0.2rem;
      padding: 0 0.3rem;
      border: 1px solid #eee;
      border-radius: 2rem;
      @include flexCenter;
    }
  }
  .swiper {
    .swiper-item {
      margin-top: 0.3rem;
      padding-left: 0.2rem;
      // padding: 0 0.2rem;
      box-sizing: border-box;
    }
  }
}
</style>

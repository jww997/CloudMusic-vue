<template>
  <div class="container">
    <!-- <van-skeleton title animate :row="1" /> -->
    <div class="header">
      <div class="title">{{ uielement.subTitle.title }}</div>
      <div class="more">{{ uielement.button.text }} &gt;</div>
    </div>
    <van-swipe
      class="swiper"
      indicator-color="white"
      width="118"
      :show-indicators="false"
      :loop="false"
    >
      <div v-for="(item, index) in list" :key="index">
        <van-swipe-item class="swiper-item" v-if="index < 6">
          <router-link
            :to="{
              name: 'playlist',
              params: { id: item.creativeId },
            }"
            :key="item.creativeId"
          >
            <cover
              :image="item.uiElement.image.imageUrl"
              :name="item.uiElement.mainTitle.title"
              :count="item.resources[0].resourceExtInfo.playCount"
            ></cover>
            <!-- :count="formatUnit(item.resources[0].resourceExtInfo.playCount)" -->
          </router-link>
        </van-swipe-item>
      </div>
    </van-swipe>
  </div>
</template>

<script>
import Cover from "@/components/cover";

import { formatUnit } from "@/assets/js/filter";

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
  data: function () {
    return {};
  },
  methods: {
    formatUnit,
  },
  mounted: function () {
    const that = this;
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.container {
  padding-bottom: 0.2rem;
  border-bottom: 0.15rem solid #eee;
  .header {
    margin: 0.2rem 0.2rem 0;
    @include flexSpaceBetween;
    .title {
      font-size: $text-S;
      font-weight: bold;
      @include omit;
    }
    .more {
      flex-shrink: 0;
      font-size: $text-XS;
      font-weight: bold;
      margin-left: 0.2rem;
      padding: 0.1rem 0.2rem;
      border: 1px solid #eee;
      border-radius: 2rem;
    }
  }
  .swiper {
    .swiper-item {
      margin-top: 0.3rem;
      padding-left: 0.2rem;
      box-sizing: border-box;
    }
  }
}
</style>

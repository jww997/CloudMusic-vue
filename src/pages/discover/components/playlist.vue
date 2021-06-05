<template>
  <div :class="{ playlist: true, active: isLoad }">
    <van-image
      class="image"
      fit="contain"
      :width="size"
      :height="size"
      :src="image"
      v-lazy="image"
      @load="load"
    />
    <span class="text" v-if="name">{{ name }}</span>
    <div class="count" v-if="count">
      <span class="iconfont">&#xe656;</span>
      <span>{{ formatUnit(count) }}</span>
    </div>
  </div>
</template>

<script>
import { formatUnit } from "@/assets/js/filter";

export default {
  name: "cover",
  props: {
    image: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  data: function () {
    return {
      size: "100%",
      isLoad: false,
    };
  },
  methods: {
    formatUnit,
    load() {
      const that = this;
      that.isLoad = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.playlist {
  position: relative;
  display: flex;
  flex-direction: column;
  .image {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.2rem;
    background-color: $theme-LIGHTGRAY;
    overflow: hidden;
    transition: 1s;
  }
  .text {
    @include omit;
    display: -webkit-box;
    white-space: normal;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    line-height: 0.5rem;
    padding-top: 0.1rem;
    font-size: $text-XXS;
    color: #333;
  }
  .count {
    color: #fff;
    font-size: $text-XS;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0.1rem 0.2rem;
    border-radius: 1rem;
    position: absolute;
    right: 5%;
    top: 5%;
    @include flexCenter;
    .iconfont {
      font-size: $text-XS;
    }
  }
  &.active:after {
    content: "";
    width: 90%;
    padding-bottom: 90%;
    margin: -0.2rem auto;
    background-color: $theme-LIGHTGRAY;
    border-radius: 0.1rem;
    z-index: -1;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
  }
}
</style>
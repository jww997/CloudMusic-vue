<template>
  <div :class="{ kid: true, active: image }">
    <van-image
      class="image"
      fit="contain"
      :width="size"
      :height="size"
      :src="image"
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
    };
  },
  methods: {
    formatUnit,
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";

.kid {
  position: relative;
  display: flex;
  flex-direction: column;
  .image {
    border-radius: 0.2rem;
    background-color: $theme-LIGHITGRAY;
    overflow: hidden;
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
    background-color: $theme-LIGHITGRAY;
    border-radius: 0.1rem;
    z-index: -1;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
  }
}
</style>
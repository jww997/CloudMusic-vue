<template>
  <div :class="{ playlist: true, active: isLoad }">
    <div class="cover">
      <van-image
        class="image"
        fit="contain"
        :width="width"
        :height="height"
        :src="image"
        v-lazy="image"
        @load="load"
        @click="$emit('handleClick')"
      />
      <div class="mask"></div>
    </div>
    <p class="text" v-if="name">{{ name }}</p>
    <div class="count" v-if="count">
      <span class="iconfont">&#xe656;</span>
      <span>{{ formatUnit(count) }}</span>
    </div>
  </div>
</template>

<script>
import { formatUnit } from "@/assets/js/filter";

export default {
  name: "playlist",
  props: ["width", "height", "image", "name", "count"],
  data () {
    return {
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
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.playlist {
  display: flex;
  flex-direction: column;
  position: relative;
  .cover {
    position: relative;
    display: flex;
    .image {
      border-radius: $border-radius-lg;
      background-color: $background-color;
      overflow: hidden;
    }
    .mask {
      width: 100%;
      height: 100%;
      margin-top: -10%;
      border-radius: $border-radius-lg;
      background-color: $background-color;
      transform: scale(0.9);
      position: absolute;
      z-index: -1;
      right: 0;
      left: 0;
    }
  }
  .text {
    line-height: $line-height-md;
    padding-top: $padding-xs;
    font-size: $font-size-md;
    color: $text-color;
    @include omitS;
  }
  .count {
    color: $active-color;
    font-size: $font-size-xs;
    padding: $padding-base $padding-xs;
    background-color: $black;
    border-radius: $border-radius-lg;
    opacity: $active-opacity;
    position: absolute;
    right: $padding-xs;
    top: $padding-xs;
    @include flexCenter;
    .iconfont {
      font-size: $font-size-xs;
      margin-right: $padding-base;
    }
  }
}
</style>
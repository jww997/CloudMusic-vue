<template>
  <div :class="{ playlist: true, active: isLoad }">
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
  name: "playlist",
  props: ["width", "height", "image", "name", "count"],
  data: function () {
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
  mounted() {
    console.log(this.$props);
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.playlist {
  position: relative;
  display: flex;
  flex-direction: column;
  .image {
    // width: 2.5rem;
    // height: 2.5rem;
    border-radius: $border-radius-lg;
    background-color: $background-color;
    overflow: hidden;
  }
  .text {
    line-height: $line-height-md;
    padding-top: $padding-xs;
    font-size: $font-size-md;
    color: $text-color;
    @include omit;
    display: -webkit-box;
    white-space: normal;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
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
  &.active:after {
    content: "";
    padding-bottom: 100%;
    margin-top: -$padding-sm;
    background-color: $background-color;
    border-radius: $border-radius-lg;
    transform: scale(0.9);
    position: absolute;
    z-index: -1;
    right: 0;
    left: 0;
  }
}
</style>
<template>
  <div class="children">
    <div class="tags">
      <span
        :class="{ tag: true, active: index == tagsIndex }"
        v-for="(item, index) in list"
        :key="item.id"
        @click="toggleCat(item.name, index)"
      >
        {{ item.name }}
      </span>
      <!-- <div class="slider" :style="{ left: `${tagsIndex}rem` }"></div> -->
    </div>
    <div class="iconfont">&#xe609;</div>
  </div>
</template>

<script>
export default {
  name: "tags",
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  data: function () {
    return {
      tagsIndex: -1,
    };
  },
  methods: {
    toggleCat: function (name, index) {
      const that = this;
      that.tagsIndex = index;
      that.$emit("toggleCat", name);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  @include flexSpaceBetween;
  height: 1rem;
  // padding: 0.3rem 0;
  box-sizing: border-box;
  background-color: #fff;
  // overflow: visible;
  @include positionCenter;
  bottom: auto;
  top: $safeDistance;
  z-index: 1;
  .tags {
    flex-grow: 1;
    width: 3rem;
    @include flexSpaceBetween;
    flex-wrap: nowrap;
    overflow: scroll;
    .tag {
      flex-shrink: 0;
      padding: 0.1rem $text-S;
      font-size: $text-XS;
      transition: 0.5s;
      color: $theme-GRAY;
      &.active {
        color: $theme-BLACK;
        font-weight: bold;
        position: relative;
        &::before {
          content: "";
          width: 50%;
          height: 0.1rem;
          background-color: $theme-RED;
          border-radius: 5rem;
          z-index: -1;
          @include positionCenter;
          top: auto;
        }
      }
    }
    // .slider {
    //   width: 1rem;
    //   height: 0.1rem;
    //   background-color: $theme-RED;
    //   border-radius: 5rem;
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    // }
  }
  .iconfont {
    flex-shrink: 0;
    margin: 0 $text-XS;
  }
}
</style>
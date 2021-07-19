<template>
  <div class="tags">
    <!-- 标签 -->
    <div class="labels">
      <span
        class="label"
        :class="{ active: index == labelIndex }"
        v-for="(item, index) in list"
        :key="item.id"
        @click="$emit('handleLabelClick', item, index)"
      >
        <!-- @click="toggleCat(item.name, index)" -->
        {{ item.name }}
      </span>
    </div>
    <!-- 编辑标签 -->
    <router-link :to="{name: 'squaretags'}">
      <van-icon class="edit" name="edit" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "tags",
  props: ["list", "labelIndex"],
  methods: {
    toggleCat(name, index) {
      const that = this;
      that.labelIndex = index;
      that.$emit("toggleCat", name);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.tags {
  height: 50px;
  padding: 0 $padding-sm;
  background-color: $white;
  position: sticky;
  top: 50px;
  z-index: 100;
  display: flex;
  align-items: center;
  .labels {
    flex-grow: 1;
    height: 50px;
    overflow: scroll;
    display: flex;
    align-items: center;
    .label {
      flex-shrink: 0;
      margin-right: $padding-sm * 2;
      font-size: $font-size-lg;
      transition: $animation-duration-base;
      &.active {
        color: $theme-color;
        position: relative;
        &::after {
          content: "";
          width: 60%;
          height: 0.1rem;
          background-color: $theme-color;
          border-radius: $border-radius-max;
          @include positionCenter;
          bottom: -$padding-sm;
          top: auto;
        }
      }
    }
  }
  .edit {
    flex-shrink: 0;
    margin-left: $padding-sm;
    font-size: $font-size-sm * 2;
  }
}
</style>
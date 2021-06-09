<template>
  <div class="block">
    <div class="block-top" v-if="title">
      <div class="title">{{ title }}</div>
      <div class="btn" v-if="btnText" @click="$emit('handleBtnClick')">
        {{ btnText }} &gt;
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "block",
  props: ["block"],
  computed: {
    title() {
      try {
        const {
          uiElement: {
            subTitle: { title },
          },
        } = this.$props.block;
        return title;
      } catch (err) {
        return "";
      }
    },
    btnText() {
      try {
        const {
          uiElement: {
            button: { text },
          },
        } = this.$props.block;
        return text;
      } catch (err) {
        return "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.block {
  background-color: $background-color-light;
  margin-bottom: $padding-xs;
  padding: $padding-sm 0;
  box-sizing: border-box;
  .block-top {
    font-weight: bold;
    padding: 0 $padding-sm $padding-xs;
    @include flexSpaceBetween;
    .title {
      font-size: $font-size-lg;
      @include omit;
    }
    .btn {
      flex-shrink: 0;
      font-size: $font-size-sm;
      padding: $padding-base $padding-sm;
      border: $border-width-base solid $border-color;
      border-radius: $border-radius-max;
      @include flexCenter;
    }
  }
}
</style>
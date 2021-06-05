<template>
  <div class="block">
    <div class="block-top">
      <div class="title">{{ title }}</div>
      <div class="btn" @click="toPages({ name: 'square' })">
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
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.block {
  padding-bottom: 0.2rem;
  margin-top: 0.15rem;
  background-color: #fff;
  .block-top {
    padding: 0.2rem 0.2rem 0.15rem;
    @include flexSpaceBetween;
    .title {
      line-height: $text-XL;
      font-size: $text-M;
      font-weight: bold;
      @include omit;
    }
    .btn {
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
}
</style>
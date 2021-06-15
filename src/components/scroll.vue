<template>
  <div class="scroll">
    <slot />
  </div>
</template>

<script>
export default {
  name: "scroll",
  props: ["handleScrollBottom"],
  methods: {
    scrollEvent() {
      const { scrollTop, clientHeight } = document.documentElement;
      const { scrollHeight } = document.body;
      if (scrollTop + clientHeight >= scrollHeight) {
        const { handleScrollBottom } = this.$props;
        handleScrollBottom && handleScrollBottom();
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.scrollEvent, false);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollEvent, false);
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
</style>
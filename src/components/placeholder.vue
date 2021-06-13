<template>
  <div class="placeholder"></div>
</template>

<script>
export default {
  name: "placeholder",
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.placeholder {
  height: 50px;
  flex-shrink: 0;
  background-color: transparent;
}
</style>
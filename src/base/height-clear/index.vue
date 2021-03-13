<template>
  <div class="base"></div>
</template>

<script>
export default {
  name: "header-clear-height",
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.base {
  flex-shrink: 0;
  height: $safeDistance;
}
</style>
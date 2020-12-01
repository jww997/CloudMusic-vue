<template>
  <div class="container">123</div>
</template>

<script>
export default {
  name: "List",
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
.container {
  @include test;
}
</style>
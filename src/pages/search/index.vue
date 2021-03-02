<template>
  <div class="container">
    <navbar fixed black title="搜索"></navbar>
  </div>
</template>

<script>
import Navbar from "@/common/navbar";
export default {
  name: "search",
  components: {
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
</style>
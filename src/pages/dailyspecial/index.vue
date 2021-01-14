<template>
  <div class="container">
    <navbar :title="'每日推荐'" fixed black></navbar>

    每日推荐
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
export default {
  name: "dailyspecial",
  components: {
    Navbar,
  },
  mounted: function () {
    const that = this;
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.container {
  @include suspension;
  box-sizing: border-box;
  padding-top: $safeDistance;
}
</style>
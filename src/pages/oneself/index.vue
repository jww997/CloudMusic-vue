<template>
  <div class="oneself">
    <navbar
      fixed
      :black="!isTop"
      :backgroundColor="!isTop ? '#fff' : ''"
    ></navbar>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
export default {
  name: "oneself",
  components: {
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.oneself {
  height: 100%;
  @include suspension;
  padding-bottom: $safeDistance;
  box-sizing: border-box;
  overflow: scroll;

  z-index: 20000;
}
</style>
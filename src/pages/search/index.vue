<template>
  <div class="search">
    <navbar fixed black title="搜索" backgroundColor="white"></navbar>

    <!-- <history></history> -->
    <hot></hot>
  </div>
</template>

<script>
import Navbar from "@/common/navbar";

import History from "./components/history";
import Hot from "./components/hot";
export default {
  name: "search",
  components: {
    Navbar,
    History,
    Hot,
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.search {
  height: 100%;
  @include suspension;
  padding-top: $safeDistance;
  box-sizing: border-box;
  overflow: scroll;
}
</style>
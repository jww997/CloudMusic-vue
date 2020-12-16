<template>
  <div class="conatiner">
    我的
    <person></person>

    <!-- <tabbar :active="2"></tabbar> -->
    <tabbar></tabbar>
  </div>
</template>

<script>
import Tabbar from "@/components/tabbar";
import Person from "./components/person";

export default {
  name: "Mine",
  components: {
    Person,
    Tabbar,
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
</style>

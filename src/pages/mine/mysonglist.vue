<template>
  <div class="mysonglist">
    <songlist :list="list" @handleClick="handleClick" />
    <!-- <block v-for="item in list" :key="item.id">
      <div>{{ item.id }}</div>
    </block> -->
  </div>
</template>

<script>
import Songlist from "./components/songlist";
export default {
  name: "mysonglist",
  props: ["list"],
  components: { Songlist },
  methods: {
    handleClick(id) {
      this.$emit("handleClick", id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
</style>

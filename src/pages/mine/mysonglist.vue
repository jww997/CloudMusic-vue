<template>
  <div class="mysonglist">
    <songlist :list="list" @handleClick="handleClick" />
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
.mysonglist {
  margin: $padding-sm $padding-sm 0;
  border-radius: $border-radius-lg;
  background-color: $white;
}
</style>

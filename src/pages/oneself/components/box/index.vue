<template>
  <div class="children">
    <!-- <list :list="playlist"></list> -->
    {{ playlist }}</div>
</template>

<script>
// import List from "@/common/list";
export default {
  name: "box",
  props: { playlist: { type: Array, default: () => [] } },
  // components: { List },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
}
</style>
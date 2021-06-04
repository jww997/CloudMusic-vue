<template>
  <div class="children">
    <block :block="block">音乐日历</block>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Block from "./components/block.vue"
export default {
  name: "calendar",
  props: ["block"],
  components: {
    Block,
  },
  computed: {
    list() {
      try {
        const { creatives } = this.$props.block;
        return creatives;
      } catch (err) {
        return [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
</style>
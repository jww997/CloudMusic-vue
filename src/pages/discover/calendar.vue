<template>
  <div class="children">
    {{ title }}
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "calendar",
  props: ["block"],
  computed: {
    title() {
      try {
        const {
          uiElement: {
            subTitle: { title },
          },
        } = this.$props.block;
        return title;
      } catch (err) {
        return "";
      }
    },
    btnText() {
      try {
        const {
          uiElement: {
            button: { text },
          },
        } = this.$props.block;
        return text;
      } catch (err) {
        return "";
      }
    },
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
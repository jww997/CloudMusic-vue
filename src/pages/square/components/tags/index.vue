<template>
  <div class="children">
    <div class="tags">
      <span class="tag" v-for="item in list" :key="item.id" :data-id="item.id">
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tags",
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  .tags {
    // @include flexCenter;
    // @include omit;
    white-space: nowrap;
    overflow: scroll;
    .tag {
      display: inline-block;
      // flex-shrink: 0;
      font-size: $text-S;
      padding: $text-S;
    }
  }
}
</style>
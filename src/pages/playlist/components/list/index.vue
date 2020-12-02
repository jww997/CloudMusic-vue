<template>
  <div class="container">
    <div>播放全部</div>
    <div>
      <div v-for="(item, index) in obj.tracks" :key="index">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    obj: {
      type: Object,
      value: {},
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
.container {
  @include test;
}
</style>
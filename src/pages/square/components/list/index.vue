<template>
  <div class="children">
    <div class="list">
      <router-link
        :to="{
          name: 'playlist',
          params: { id: item.id },
        }"
        v-for="item in list"
        :key="item.id"
      >
        <cover
          class="item"
          :image="item.coverImgUrl"
          :name="item.name"
          :count="item.playCount"
        ></cover>
      </router-link>
    </div>
  </div>
</template>

<script>
import Cover from "@/components/cover";
export default {
  name: "list",
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  components: {
    Cover,
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  .list {
    @include flexSpaceBetween;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-left: 0.25rem;
    .item {
      width: 3rem;
      margin-bottom: 0.25rem;
      margin-right: 0.25rem;
    }
  }
}
</style>
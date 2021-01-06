<template>
  <div class="children">
    <div class="list">
      <!-- <router-link
        :to="{
          name: 'playlist',
          params: { id: item.id },
        }"
      > -->
      <div
        class="item"
        v-for="item in list"
        :key="item.id"
        @click="toPages({ name: 'playlist', params: { id: item.id } })"
      >
        <cover
          class="cover"
          :image="item.coverImgUrl"
          :name="item.name"
          :count="item.playCount"
        ></cover>
      </div>
      <!-- </router-link> -->
    </div>
  </div>
</template>

<script>
import { toPages } from "@/assets/js/skip.js";
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
  methods: {
    toPages,
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  .list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-left: 2.5%;
    .item {
      width: 30%;
      margin-bottom: 2.5%;
      margin-right: 2.5%;
      .cover {
        >>> .text {
          font-size: $text-XS;
        }
      }
    }
  }
}
</style>
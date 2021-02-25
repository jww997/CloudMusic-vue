<template>
  <div class="children">
    <div class="list">
      <!-- <router-link
        :to="{
          name: 'playlist',
          params: { id: item.id },
        }"
      > -->
      <!-- <div class="wrap"> -->
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="toPages({ name: 'square/playlist', params: { id: item.id } })"
      >
        <cover
          class="cover"
          :image="item.coverImgUrl"
          :name="item.name"
          :count="item.playCount"
        ></cover>
        <!-- </div> -->
      </div>
      <!-- </router-link> -->
      <van-loading class="loading" size="24px">加载中...</van-loading>
    </div>
  </div>
</template>

<script>
import { toPages } from "@/assets/js/util.js";
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
  height: 100%;
  padding-left: 2.5%;
  box-sizing: border-box;
  .list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    // overflow: hidden;
    overflow: scroll;
    .item {
      width: 30%;
      margin-bottom: 4%;
      margin-right: 3.3%;
      .cover {
        >>> .text {
          font-size: $text-XS;
        }
      }
    }
  }
}
</style>
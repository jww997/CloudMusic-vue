<template>
  <div class="container">
    <div class="header">
      <div class="title">推荐歌单</div>
      <div class="more">更多 &gt;</div>
    </div>
    <van-swipe
      class="swiper"
      indicator-color="white"
      width="118"
      :show-indicators="false"
      :loop="false"
    >
      <div v-for="(item, index) in list" :key="index">
        <van-swipe-item class="swiper-item" v-if="index < 6">
          <router-link
            :to="{ path: '/playlist', query: { id: item.id } }"
            :key="item.id"
          >
            <cover
              :image="item.picUrl"
              :name="item.name"
              :count="item.playCount"
            ></cover>
          </router-link>
        </van-swipe-item>
      </div>
    </van-swipe>
  </div>
</template>

<script>
import Cover from "@/components/cover";
export default {
  name: "whirligig",
  components: {
    Cover,
  },
  props: {
    list: {
      type: Array,
      value: [],
    },
  },
  data: function () {
    return {};
  },
  mounted: function () {
    const that = this;
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
.container {
  padding-bottom: 0.2rem;
  border-bottom: 0.15rem solid #eee;
  .header {
    margin: 0.2rem 0.2rem 0;
    @include flexSpaceBetween;
    .title {
      font-size: 0.3rem;
      font-weight: bold;
      @include omit;
    }
    .more {
      flex-shrink: 0;
      font-size: 0.2rem;
      font-weight: bold;
      margin-left: 0.2rem;
      padding: 0.1rem 0.2rem;
      border: 1px solid #eee;
      border-radius: 2rem;
    }
  }
  .swiper {
    .swiper-item {
      margin-top: 0.3rem;
      padding-left: 0.2rem;
      box-sizing: border-box;
    }
  }
}
</style>